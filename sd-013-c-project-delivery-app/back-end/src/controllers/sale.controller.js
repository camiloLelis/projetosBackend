const rescue = require('express-rescue');
const service = require('../services/sale.service');
const productService = require('../services/product.service');
const saleProductService = require('../services/saleProduct.service');

const create = rescue(async (req, res, _next) => {
  const { saleInput, products } = req.body;
  const sale = await service.create(saleInput);

  await Promise.all(products.map(async (product) => {
    const newSaleProduct = await saleProductService.create({
      productId: product.id,
      quantity: product.quantity,
      saleId: sale.id,
    });
    console.log(newSaleProduct);
  }));

  res.status(201).json({ sale });
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = await service.getById(id);

  const saleProducts = await saleProductService.getAllBySaleId(id);

  const products = await Promise.all(saleProducts.map(async (item) => {
    const product = await productService.getById(item.productId);
    product.dataValues.quantity = item.dataValues.quantity;
    return product;
  }));

  res.status(200).json({ sale, products });
});

const getAll = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sales = await service.getAll(id);

  res.status(200).json({ sales });
});

const editStatusById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedSale = await service.editStatusById(id, status);

  res.status(200).json({ sale: updatedSale });
});

module.exports = {
  create,
  getById,
  getAll,
  editStatusById,
};
