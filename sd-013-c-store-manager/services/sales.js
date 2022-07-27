/*
referencia: https://github.com/tryber/sd-013-c-store-manager/blob/cassio-pereira-sd-013-store-manager/services/sales.services.js 
O productId devem ser igual ao id de um produto anteriormente cadastrado;
ou seja, para fazer a venda o produto deve existir.
quantity deve ser um número inteiro maior que 0;
ou seja, só tem como vender se tiver em estoque
Cada venda deve ter um id que seja único e gerado no momento em que o recurso for criado;
ou seja, cada venda realizada tem que ser identificavel.
A resposta do endpoint em caso de sucesso deve ser a(s) venda(s) criada(s). 
ou seja, depois de todo o processo o controller precisa retornar o que foi cadastrado em sales */

const Joi = require('@hapi/joi');
const salesModels = require('../models/salesModels');
const er = require('../utils');
const products = require('../models/products');

const ObjSales = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
});

const arraySales = Joi.array().items(ObjSales);

const quantityValidate = async (sales) => Promise.all(sales.map(async ({ productId, quantity }) => {
  const qty = await products.quantityVerify(productId);

  if (quantity > qty) return false;
  return true;
}));

const createSalesService = async (body) => {
  // preciso fazer as verificações
  const { error } = arraySales.validate(body);
  if (error) throw er.objError(422, 'invalid_data', 'Wrong product ID or invalid quantity'); 
  const [validation] = await quantityValidate(body);
  if (!validation) throw er.objError(422, 'invalid_data', 'Wrong product ID or invalid quantity');
  // depois preciso fazer o cadastro no bd
   const sale = await salesModels.createSalesModel(body);
  /*  console.log('sale no sales.js services:  ', sale); */
   return sale;
};

const listSalesService = async () => {
  const salesList = await salesModels.listSalesModules();
  return { sales: salesList };
}; 

const listSalesOneService = async (id) => {
  const find = await salesModels.listSalesModulesOne(id);
  if (!find) throw er.objError(404, 'not_found', 'Sale not found');
  return find;
};

const updateSalesServices = async (id, productId, quantity) => {
  const frase = 'Wrong product ID or invalid quantity';
  const code = 'invalid_data';
  if (quantity <= 0 || Number.isInteger(quantity) === false) throw er.objError(422, code, frase);
  const update = await salesModels.updateSalesModules(id, productId, quantity);
  if (!update) throw er.objError(422, code, frase);
  return update;
};

const delSalesService = async (id) => {
  const verifyId = await salesModels.listSalesModulesOne(id);
  if (!verifyId) throw er.objError(422, 'invalid_data', 'Wrong sale ID format');
  const del = await salesModels.delSalesModules(id);
  if (!del) throw er.objError(422, 'invalid_data', 'Wrong sale ID format');
  console.log('aqui é no service do sales.js: ', del);
  return del;
};

module.exports = {
  createSalesService,
  listSalesService,
  listSalesOneService,
  updateSalesServices,
  delSalesService,
};
