const { ObjectId } = require('mongodb');
const connection = require('./connection');
const er = require('../utils');

const createSalesModel = async (body) => {
  const connect = await connection();
  const { ops } = await connect.collection('sales').insertOne({ itensSold: body });
 /*  console.log('resposta em salesModels.js: ', sales); */
  const [result] = ops;
  return result;
};

const listSalesModules = async () => {
  const connect = await connection();
  const all = await connect.collection('sales').find().toArray();
  return all;
};

const listSalesModulesOne = async (id) => {
  try {
    if (!ObjectId(id)) throw er.objError(404, 'not_found', 'Sale not found');
    const connect = await connection();
    const one = await connect.collection('sales').findOne({ _id: ObjectId(id) });
    return one;
  } catch (error) {
    return null;
  }
};

const updateSalesModules = async (id, productId, quantity) => {
    if (!ObjectId(id)) throw er.objError(404, 'not_found', 'Sale not found');
    const connect = await connection();
    await connect.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: { productId, quantity } } },
      );
  return true;
};

const delSalesModules = async (id) => {
  if (!ObjectId(id)) throw er.objError(404, 'not_found', 'Sale not found');
  const connect = await connection();
  const todoReturn = await connect.collection('sales').remove({ _id: ObjectId(id) }); 
  return todoReturn;
};

module.exports = {
  createSalesModel,
  listSalesModules,
  listSalesModulesOne,
  updateSalesModules,
  delSalesModules,
};
