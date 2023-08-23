const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const connectMongodb = require("./config/db.js");

const user = require("./routes/user.js");
const dashboard = require("./routes/dashboard.js");

// Connect db
connectMongodb();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Middleware function to log the endpoint
const logEndpoint = (req, res, next) => {
  console.log(`Endpoint called: ${req.method} ${req.url}`);
  next();
};

app.use(logEndpoint);
app.use(helmet());

// routes
app.use("/user", user);
app.use("/dashboard", dashboard);

app.use(function (req, res, next) {
  return res.status(404).json({ success: false, error: "endpoint not found" });
});

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});
