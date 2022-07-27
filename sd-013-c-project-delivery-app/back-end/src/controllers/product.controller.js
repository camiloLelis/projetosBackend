const rescue = require('express-rescue');
const service = require('../services/product.service');

const getAll = rescue(async (req, res, _next) => {
  const products = await service.getAll();

  return res.status(200).json({ products });
});

module.exports = {
  getAll,
};
