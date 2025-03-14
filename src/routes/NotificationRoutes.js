const express = require("express");
const routes = require("express").Router();
const notificationController = require("../controllers/NotificationControllers");

//  Create a new notification
routes.post("/", notificationController.createNotification);

//  Get all notifications
routes.get("/", notificationController.getAllNotifications);

//  Get notifications by user ID
routes.get("/user/:user_id", notificationController.getNotificationsByUserId);

//  Delete a notification
routes.delete("/:id", notificationController.deleteNotification);

module.exports = routes;
