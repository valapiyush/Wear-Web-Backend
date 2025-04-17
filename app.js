const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const app = express()
app.use(cors()); 
app.use(express.json())
const UserRoutes = require("./src/routes/UserRoutes")
app.use(UserRoutes)

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const sellerRoutes = require("./src/routes/SellerRoutes")
app.use(sellerRoutes)

const productsRoutes = require("./src/routes/ProductsRoutes")
app.use("/products",productsRoutes)

const categoriesRoutes = require("./src/routes/CategoriesRoutes")
app.use("/category",categoriesRoutes)

const subcategoriesRoutes = require("./src/routes/SubcategoriesRoutes")
app.use("/subcategory",subcategoriesRoutes)


const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const countryRoutes = require("./src/routes/CountryRoutes")
app.use("/country",countryRoutes)

const userDetailsRoutes = require("./src/routes/UserDetailsRoutes")
app.use("/user-details",userDetailsRoutes)

const ordersRoutes = require("./src/routes/OrdersRoutes")
app.use(ordersRoutes)

const cartRoutes = require("./src/routes/CartRoutes")
app.use("/cart",cartRoutes)

const shipmentAndDeliveryRoutes = require("./src/routes/ShipmentAndDeliveryRoutes");
app.use("/shipments", shipmentAndDeliveryRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notifications", notificationRoutes);

const orderTransactionRoutes = require("./src/routes/OrderTransactionRoutes")
app.use(orderTransactionRoutes)

const wishlistRoutes = require("./src/routes/WishlistRoutes")
app.use("/wishlist",wishlistRoutes)

const reviewAndRatingRoutes = require("./src/routes/ReviewAndRatingRoutes")
app.use("/reviews",reviewAndRatingRoutes)

const discountAndCouponController = require("./src/routes/DiscountAndCouponRoutes")
app.use("/discounts",discountAndCouponController)

const bannerAndAdvertisemtRoutes = require("./src/routes/BannerAndAdvertisementRoutes")
app.use("/banners",bannerAndAdvertisemtRoutes)

const inventoryRoutes = require("./src/routes/InventoryRoutes")
app.use("/inventory",inventoryRoutes)

const paymentRoutes = require("./src/routes/PaymentRoutes")
app.use("/payment",paymentRoutes)

const refundAndReturnRoutes = require("./src/routes/ReturnAndRefundRoutes")
app.use("/refund",refundAndReturnRoutes)

const addressRoutes = require("./src/routes/AddressRoutes")
app.use("/address",addressRoutes)

const adminRoutes = require("./src/controllers/AdminController")
app.use('/admin', adminRoutes);
mongoose.connect("mongodb://localhost:27017/25_node_internship").then(()=>{
    console.log("Database is connected")
})

const PORT  = 3000
app.listen(PORT,()=>{
    console.log("Server is up and running on port no: ",PORT)
})