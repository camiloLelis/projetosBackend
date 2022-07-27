const { saleProduct } = require('../database/models');
const saleProductSchema = require('../schemas/saleProduct.schema');
const { validateError } = require('../utils');

const create = async (input) => {
  const { error } = saleProductSchema.validate(input);

  if (error) throw validateError(400, error.message);

  const newSaleProduct = await saleProduct.create(input);

  return newSaleProduct;
};

const getAllBySaleId = async (id) => {
  const saleProductItem = await saleProduct.findAll({ where: { saleId: id } });

  return saleProductItem;
};

module.exports = {
  create,
  getAllBySaleId,
};
