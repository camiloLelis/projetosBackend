const products = require('../models/products');
const er = require('../utils');

const create = async (name, quantity) => {
  const { error } = er.productValidate.validate({ name, quantity });
if (error) throw er.objError(422, 'invalid_data', error.message); 

const searchForName = await products.findForName(name);

if (searchForName) throw er.objError(422, 'invalid_data', 'Product already exists');

  const productCreate = await products.create(name, quantity);
  return { _id: productCreate, name, quantity }; 
};

const listProducts = async () => {
  const productsList = await products.listProducts();
  return { products: productsList };
};

const findForId = async (id) => {
  const findName = await products.findForId(id);
  if (!findName) throw er.objError(422, 'invalid_data', 'Wrong id format');
  return findName;
};

const editProductServices = async (id, name, quantity) => {
  const { error } = er.productValidate.validate({ name, quantity });
  if (error) throw er.objError(422, 'invalid_data', error.message);
  const errId = await products.findForId(id);
  if (!errId) throw er.objError(422, 'invalid_data', 'Wrong id format');
  const resBd = await products.editProductModules(id, name, quantity);
  return resBd;
};

const delProductServices = async (id) => {
  const productExist = await products.findForId(id);
  if (!productExist) throw er.objError(422, 'invalid_data', 'Wrong id format');
  await products.delProductModules(id);
  return productExist;
};

module.exports = {
  create,
  listProducts,
  findForId,
  editProductServices,
  delProductServices,
};