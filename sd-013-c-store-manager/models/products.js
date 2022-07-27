const { ObjectId } = require('mongodb');
const connection = require('./connection');
const er = require('../utils');

/* const create = async (name, quantity) =>{
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { message: 'produto criado' };
}; */

const create = async (name, quantity) => {
  const connect = await connection();

  const { insertedId } = await connect.collection('products').insertOne({ name, quantity });

  return insertedId;
};

const findForName = async (name) => {
  const connect = await connection();
  const insertedName = await connect.collection('products').findOne({ name });
  return insertedName;
};

const findForId = async (id) => {
  try {
    if (!ObjectId(id)) throw er.objError(422, 'invalid_data', 'Wrong id format');
    const connect = await connection();
    const insertedId = await connect.collection('products').findOne({ _id: ObjectId(id) });
    return insertedId;
  } catch (error) {
    return null;
  }
};

const listProducts = async () => {
  const connect = await connection();
  const all = await connect.collection('products').find().toArray();
  return all;
};

const editProductModules = async (_id, name, quantity) => {
  try {
    const connect = await connection();
    await connect.collection('products').updateOne(
      { _id: ObjectId(_id) },
      { $set: { name, quantity } },
      );
      if (!ObjectId(_id)) throw er.objError(422, 'invalid_data', 'Wrong id format');
    return { _id, name, quantity };
  } catch (error) {
    return null;
  }
};

const delProductModules = async (id) => {
  const connect = await connection();
  await connect.collection('products').remove({ _id: ObjectId(id) });
  return true;
};

const quantityVerify = async (id) => {
  const connect = await connection();

  const { quantity } = await connect.collection('products').findOne({ _id: ObjectId(id) });
 /*  console.log('quantity em products model: ', quantity); */
  return quantity;
};

module.exports = {
  create,
  findForName,
  listProducts,
  findForId,
  editProductModules,
  delProductModules,
  quantityVerify,
};