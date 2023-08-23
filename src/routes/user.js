const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/user.js");

userRoutes.post("/auth/register", async (req, res) => {
  await userController.register(req, res);
});

userRoutes.post("/auth/login", async (req, res) => {
  await userController.login(req, res);
});

module.exports = userRoutes;
