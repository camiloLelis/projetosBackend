const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  passwordRaw: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'seller', 'administrator').required(), 
});
