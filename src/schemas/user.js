const Joi = require("joi");

const register = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const login = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  register,
  login,
};
