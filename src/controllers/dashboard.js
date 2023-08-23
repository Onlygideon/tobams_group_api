const response = require("../utils/response.js");

/**
 * @name getDashboard
 * @description Get dashboard message
 * @param {*} req
 * @param {*} res
 * @access  Private
 */
const getDashboard = async (req, res) => {
  const user = req.user;

  try {
    return response.success(res, `Welcome to your dashboard, ${user.userName}.`);
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

module.exports = {
  getDashboard,
};
