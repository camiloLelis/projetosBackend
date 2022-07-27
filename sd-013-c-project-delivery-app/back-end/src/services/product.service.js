const { product } = require('../database/models');

const getAll = async () => {
  const products = await product.findAll();

  return products;
};

const getById = async (id) => {
  const productById = await product.findByPk(id);

  return productById;
};

module.exports = {
  getAll,
  getById,
};
