const rescue = require('express-rescue');
const service = require('../services/products');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  // Caso haja erro na criação da pessoa autora, iniciamos o fluxo de erro
  if (newProduct.error) return next(newProduct.error);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // da nova pessoa autora
  return res.status(201).json(newProduct);
});

const findForId = rescue(async (req, res, next) => {
  const { id } = req.params;
  const viewProduct = await service.findForId(id);
  if (viewProduct.error) return next(viewProduct.error);
  return res.status(200).json(viewProduct);
});

const listProducts = rescue(async (req, res, next) => {
  const productsList = await service.listProducts();
  if (productsList.error) return next(productsList.error);
  return res.status(200).json(productsList);
});

const editProductControllers = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const bodyReqData = await service.editProductServices(id, name, quantity);
  console.log(bodyReqData);
  if (!bodyReqData) return next(bodyReqData.error);
  return res.status(200).json(bodyReqData);
});

const delProductControllers = rescue(async (req, res, next) => {
  const { id } = req.params;
  const productForDel = await service.delProductServices(id);
  if (!productForDel) return next(productForDel.error);
  return res.status(200).json(productForDel);
});

module.exports = {
  create,
  findForId,
  listProducts,
  editProductControllers,
  delProductControllers,
};
