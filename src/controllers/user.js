const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const userSchema = require("../schemas/user.js");
const response = require("../utils/response.js");

/**
 * @name Register
 * @description Register user
 * @param {*} req
 * @param {*} res
 * @access  Public
 */
const register = async (req, res) => {
  const { error } = userSchema.register.validate(req.body);
  if (error) {
    return response.badRequest(res, error.details[0].message);
  }

  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName?.toLowerCase() });

    if (user) {
      return response.badRequest(res, `User already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // register new user
    let newUser = {
      userName: userName?.toLowerCase(),
      password: hashedPassword,
    };
    let registerUser = await User.create(newUser);

    if (registerUser) {
      return response.created(res, "User registered successfully");
    } else {
      return response.badRequest(res, "Could not register user");
    }
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

/**
 * @name Login
 * @description Login users
 * @param {*} req
 * @param {*} res
 * @access  Public
 */
const login = async (req, res) => {
  const { error } = userSchema.login.validate(req.body);
  if (error) {
    return response.badRequest(res, error.details[0].message);
  }

  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName?.toLowerCase() });

    if (user) {
      const compare = await bcrypt.compare(password, user?.password);
      if (compare) {
        const token = jwt.sign(
          {
            userName: user.userName,
            id: user._id,
          },
          process.env.JWT_SECRET || "tobamsgroup",
          { expiresIn: "3d" }
        );
        return response.success(res, { token, user });
      } else return response.badRequest(res, "Invalid username or password");
    } else {
      return response.notFound(res, "Invalid userName");
    }
  } catch (error) {
    return response.serverError(res, error.message);
  }
};

module.exports = {
  register,
  login,
};
