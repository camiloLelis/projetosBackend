const Joi = require('joi');

const objError = (status, message) => ({
 status,
  message,
});

const userValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  objError,
  userValidate,
};
