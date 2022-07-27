const { ObjectId } = require('mongodb');
const connection = require('./connections');

const recipeInsertModel = async ({ userId, name, ingredients, preparation }) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('recipes').insertOne({ 
    userId, name, ingredients, preparation });
  return insertedId;
};

const recipeListModel = async () => {
  const connect = await connection();
  const arrayRecipes = await connect.collection('recipes').find({}).toArray();
  return arrayRecipes;
};

const recipeFindId = async (id) => {
    try {
      const connect = await connection();
      const recipeId = await connect.collection('recipes').findOne({ _id: ObjectId(id) });
      return recipeId;
    } catch (error) {
      return null;
    }
};

const recipeUpdateModel = async (idParams, name, ingredients, preparation) => {
  try {
    const connect = await connection();
    await connect.collection('recipes').updateOne(
      { _id: ObjectId(idParams) },
      { $set: { name, ingredients, preparation } },
    );
    return true; 
  } catch (error) {
    return null;
  }
};

const recipeDelModel = async (id) => {
  const connect = await connection();
  await connect.collection('recipes').removeOne({ _id: ObjectId(id) });
  return true;
};

const recipeImageModel = async (id) => {
  const connect = await connection();
 await connect.collection('recipes').updateOne(
    { _id: ObjectId(id) },
  { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } },
  );
  return true;
};

module.exports = {
  recipeInsertModel,
  recipeListModel,
  recipeFindId,
  recipeUpdateModel,
  recipeDelModel,
  recipeImageModel,
};
