const orderModel = require("../models/OrderModels")
const mongoose = require("mongoose");
const { jsPDF } = require("jspdf");
require("jspdf-autotable"); // enable autotable
const { Readable } = require("stream");

const generateInvoice = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate("user_id");
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("INVOICE", 14, 20);

        doc.setFontSize(12);
        doc.text(`Order ID: ${order._id}`, 14, 30);
        doc.text(`Customer: ${order.user_id?.name || "Unknown User"}`, 14, 36);
        doc.text(`Payment Method: ${order.payment_method || "N/A"}`, 14, 42);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 48);

        const tableRows = order.cart.map((item) => [
            item.product_id?.product_name || "Unknown",
            item.quantity,
            `₹${item.price}`,
            `₹${item.quantity * item.price}`,
        ]);

        doc.autoTable({
            startY: 60,
            head: [["Product", "Qty", "Price", "Total"]],
            body: tableRows,
        });

        const subtotal = order.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingFee = order.shipping_fee || 50;
        const total = subtotal + shippingFee;

        doc.text(`Subtotal: ₹${subtotal}`, 14, doc.autoTable.previous.finalY + 10);
        doc.text(`Shipping: ₹${shippingFee}`, 14, doc.autoTable.previous.finalY + 16);
        doc.setFontSize(14);
        doc.text(`TOTAL: ₹${total}`, 14, doc.autoTable.previous.finalY + 26);

        const pdfBuffer = doc.output("arraybuffer");

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=invoice_${order._id}.pdf`,
        });
        res.send(Buffer.from(pdfBuffer));
    } catch (err) {
        console.error("Error generating invoice:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
const getAllOrders = async(req, res) =>{
    try{
        const orders = await orderModel.find().populate("user_id").populate("shipping_address_id").populate("products.product_id");
        res.status(200).json({
            success: true,
            data: orders
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getOrderByUserId = async(req, res) =>{
    try {
        
        const user_id = new mongoose.Types.ObjectId(req.params.id);

        // Fetch orders where user_id matches
        const orders = await orderModel.find({ user_id}).populate("user_id").populate("shipping_address_id").populate("products.product_id");

        // If no orders found, return 404
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.status(200).json({ success: true, data: orders });

    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
}
const getOrderById = async(req, res)=>{
    try{
        const order = await orderModel.findById(req.params.order_id).populate("user_id").populate("shipping_address_id").populate("products.product_id")
        if(!order) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: order
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createOrder = async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user_id);
      const shippingAddressId = new mongoose.Types.ObjectId(req.body.shipping_address_id);
  
      const newOrder = await orderModel.create({
        user_id: userId,
        products: req.body.products,
        total_amount: req.body.total_amount,
        status: req.body.status || "Pending",
        payment_status: req.body.payment_status || "Pending",
        payment_method: req.body.payment_method || "COD",
        shipping_address_id: shippingAddressId,
      });
  
      res.status(201).json({
        success: true,
        data: newOrder,
      });
    } catch (err) {
      console.error("Order creation error:", err);
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
  

const updateOrder = async(req, res) =>{
    try{
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if(!updatedOrder) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: updatedOrder
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteOrder = async(req, res) =>{
    try{
        const deletedOrder = await orderModel.findByIdAndDelete(req.params.id)
        if(!deletedOrder) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: deletedOrder
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// routes/orderRoutes.js or controller
const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments({});
    
        const activeOrders = await orderModel.countDocuments({
          status: { $in: ["Pending", "Processing", "Shipped"] }
        });
    
        const completedOrders = await orderModel.countDocuments({
          status: "Delivered"
        });
    
        const returnOrders = await orderModel.countDocuments({
          status: "Cancelled"
        });
    
        const totalRevenueAgg = await orderModel.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$total_amount" } // make sure this matches DB field
            }
          }
        ]);
    
        const totalRevenue = totalRevenueAgg[0]?.total || 0;
    
        res.status(200).json({
          success: true,
          data: {
            totalOrders,
            activeOrders,
            completedOrders,
            returnOrders,
            totalRevenue
          }
        });
      } catch (error) {
        console.error("Dashboard stats error:", error.message);
        res.status(500).json({ success: false, error: error.message });
      }
  };
  const getSalesData = async (req, res) => {
    try {
      const period = req.query.period;
      let salesData = [];
  
      if (!["weekly", "monthly", "yearly"].includes(period)) {
        return res.status(400).json({ success: false, message: "Invalid period parameter" });
      }
  
      if (period === "weekly") {
        console.log("Fetching", period, "sales data...");
        salesData = await orderModel.aggregate([
          {
            $match: {
              createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // last 7 days
            }
          },
          {
            $group: {
              _id: { $dayOfWeek: "$createdAt" }, // Group by day of the week (1 = Sunday)
              totalSales: { $sum: "$total_amount" }
            }
          },
          { $sort: { "_id": 1 } }
        ]);
        console.log("Raw sales data:", salesData);
      } else if (period === "monthly") {
        salesData = await orderModel.aggregate([
          {
            $group: {
              _id: { $month: "$createdAt" }, // Group by month (1 = January)
              totalSales: { $sum: "$total_amount" }
            }
          },
          { $sort: { "_id": 1 } }
        ]);
      } else if (period === "yearly") {
        salesData = await orderModel.aggregate([
          {
            $group: {
              _id: { $year: "$createdAt" }, // Group by year
              totalSales: { $sum: "$total_amount" }
            }
          },
          { $sort: { "_id": 1 } }
        ]);
      }
  
      // Format the data
      let formattedData = [];
  
      if (period === "weekly") {
        const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        formattedData = salesData.map(item => ({
          label: dayLabels[item._id - 1],
          sales: item.totalSales
        }));
      } else if (period === "monthly") {
        const monthLabels = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        formattedData = salesData.map(item => ({
          label: monthLabels[item._id - 1],
          sales: item.totalSales
        }));
      } else if (period === "yearly") {
        formattedData = salesData.map(item => ({
          label: item._id.toString(),
          sales: item.totalSales
        }));
      }
  
      res.status(200).json({ success: true, data: formattedData });
    } catch (error) {
      console.error("Error fetching sales data:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
module.exports = {
    createOrder,
    getAllOrders,
    getOrderByUserId,
    getOrderById,
    updateOrder,
    deleteOrder,
    generateInvoice,
    getDashboardStats,
    getSalesData
}