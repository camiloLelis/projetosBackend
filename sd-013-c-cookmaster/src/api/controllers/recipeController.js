const recipeService = require('../services/recipeService');

const recipeInsertController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const serviceRes = await recipeService.recipeInsertService(_id, name, ingredients, preparation);
    return res.status(201).json(serviceRes);
  } catch (error) {
      next(error);
  }
};

const recipeListController = async (req, res, next) => {
  try {
    const arrayRecipes = await recipeService.recipeListService();
    return res.status(200).json(arrayRecipes);
  } catch (error) {
    next(error);
  }
};

const recipeOneController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeId = await recipeService.recipeOneService(id);
    return res.status(200).json(recipeId);
  } catch (error) {
      next(error);
  }  
};

/* const recipeEditController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const userJwt = req.user;
    const { _id } = userJwt;

    const objetoparateste = { 
        nomequeveiodobody: name, 
        ingredientsBody: ingredients, 
        preparationbody: preparation, 
        idparams: id, 
        userdojwtvalidacao: userJwt };
  //   const resService = await recipeService
  //    .recipeEditService(id, name, ingredients, preparation, userJwt); 
      console.log(_id);
    res.status(200).json(objetoparateste);
  } catch (error) {
    next(error);
  }
}; */

const recipeEditController = async (req, res, next) => {
  try {
    const { id: idParams } = req.params;
    const userJwt = req.user;
    const { _id: idJWT } = userJwt;
     const resService = await recipeService
      .recipeEditService(idParams, req.body, userJwt, idJWT); 
    res.status(200).json(resService);
  } catch (error) {
    next(error);
  }
};

const recipeDelController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultService = await recipeService.recipeDelService(id);
    return res.status(204).json(resultService);
  } catch (error) {
    next(error);
  }
};

const recipeImageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = req.user;
    const resService = await recipeService.recipeImageService(id, usuario);
    res.status(200).json(resService);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recipeInsertController,
  recipeListController,
  recipeOneController,
  recipeEditController,
  recipeDelController,
  recipeImageController,
};