const Joi = require('joi');
const recipeModel = require('../models/recipeModel');
const err = require('../utils/objerr');

const recipeValidate = Joi.object({
  userId: Joi.required(),
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const recipeInsertService = async (userId, name, ingredients, preparation) => {
  const { error } = recipeValidate.validate({ userId, name, ingredients, preparation });
  if (error) throw err(400, 'Invalid entries. Try again.');
  const recipeId = await recipeModel.recipeInsertModel({ userId, name, ingredients, preparation });
  const recipe = {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeId,
  };

  return { recipe };
};

const recipeListService = async () => {
  const arrayRecipes = await recipeModel.recipeListModel();
  return arrayRecipes;
};

const recipeOneService = async (id) => {
  const existRecipeId = await recipeModel.recipeFindId(id);
  if (!existRecipeId) throw err(404, 'recipe not found');
  return existRecipeId;
};

const recipeEditService = async (idParams, inf, _userJwt, _idJWT) => {
  // validar se é admin ou a receita é do id/email logado
  const { name, ingredients, preparation } = inf;
  // console.log('chegou o user jwt aqui no service: ', userJwt, idJWT);
  const { _id: idUsuario } = await recipeModel.recipeFindId(idParams);
  /*  if (userJwt.role !== 'admin' && idUsuario !== idJWT) throw err(401, 'jwt malformed');  */
  // chama o model e passa o id receita a ser edit e seus dados novos
  await recipeModel.recipeUpdateModel(idParams, name, ingredients, preparation);
  // retorna para o controller 
  return {
    _id: idParams,
    name,
    ingredients,
    preparation,
    userId: idUsuario,
  };
};

const recipeDelService = async (id) => {
  const res = await recipeModel.recipeFindId(id);
  if (!res) throw err(401, '');
  await recipeModel.recipeDelModel(id);
  return {}; 
};

const recipeImageService = async (id, usuario) => {
  // A receita só pode ser atualizada caso pertença ao usuário logado ou caso o usuário logado seja admin.
  const recipe = await recipeModel.recipeFindId(id);
  const { role, _id: idJWT } = usuario;
  console.log('aqui(service) recipe depois de buscar no bd:  ', recipe);
  console.log('aqui(service) USUARIO:  ', usuario);
  if (recipe.userId.equals(idJWT) || role === 'admin') {
    await recipeModel.recipeImageModel(id);
    const recipeImageAdd = await recipeModel.recipeFindId(id);
    return recipeImageAdd;
  }
  throw err(401, 'not authorized');
};

module.exports = {
  recipeInsertService,
  recipeListService,
  recipeOneService,
  recipeEditService,
  recipeDelService,
  recipeImageService,
};
