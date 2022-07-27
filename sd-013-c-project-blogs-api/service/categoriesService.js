const Joi = require('joi');
const { Categorie } = require('../models');
const objerror = require('../uteis/objerror');

const validateNameJoi = Joi.object({
  name: Joi.required(),
});

const create = async (name) => {
  const { error } = validateNameJoi.validate({ name });
  if (error) throw objerror(400, error.message);
  const result = await Categorie.create({ name });
  return result.dataValues;
};

const list = async () => {
  const result = await Categorie.findAll();
  console.log(result.dataValues);
  return result;
};

module.exports = {
  create,
  list,
};