const jwt = require("jsonwebtoken");
const response = require("../utils/response.js");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "tobamsgroup");
    req.user = decoded;

    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return response.unauthorized(res, `Jwt expired`);
    } else {
      return response.unauthorized(res, "Auth failed");
    }
  }
};
