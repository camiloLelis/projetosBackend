const Joi = require('joi');

module.exports = Joi.object({
  saleId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});
