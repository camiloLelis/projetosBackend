const Joi = require('@hapi/joi');

const objError = (status, code, message) => ({
  status,
  code,
  message,
});

const productValidate = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  objError,
  productValidate,
};
