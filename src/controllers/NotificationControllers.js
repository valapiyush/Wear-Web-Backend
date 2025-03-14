const Notification = require("../models/NotificationModels");

//  Create a new notification
const createNotification = async (req, res) => {
    try {
        const { user_id, message, type, status } = req.body;

        const newNotification = await Notification.create({ user_id, message, type, status });

        res.status(201).json({ success: true, data: newNotification });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//  Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate("user_id");

        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//  Get notifications by user ID
const getNotificationsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        const notifications = await Notification.find({ user_id }).populate("user_id");

        if (!notifications.length) {
            return res.status(404).json({ success: false, message: "No notifications found for this user" });
        }

        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//  Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationsByUserId,
    deleteNotification
};
