const Joi = require('joi');

module.exports = Joi.object({
  userId: Joi.number().integer().required(),
  sellerId: Joi.number().integer().required(),
  totalPrice: Joi.number().min(1).required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  saleDate: Joi.date().required(),
  status: Joi.string().valid('Pendente', 'Preparando', 'Entregue', 'Em Trânsito').required(),
});
