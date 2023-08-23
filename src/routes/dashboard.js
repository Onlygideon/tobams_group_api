const express = require("express");
const dashboardRoutes = express.Router();
const dashboardController = require("../controllers/dashboard.js");
const userAuth = require("../middlewares/auth.js");

dashboardRoutes.get("/", userAuth, async (req, res) => {
  await dashboardController.getDashboard(req, res);
});

module.exports = dashboardRoutes;
