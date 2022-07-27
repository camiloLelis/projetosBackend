const Joi = require('joi');
const { User } = require('../models');
const objerror = require('../uteis/objerror');

const validatorJoi = Joi.object({
  displayName: Joi.string().min(8).required(), 
  email: Joi.string().email().required(), 
  password: Joi.string().length(6).required(), 
  image: Joi.string().required(),
});

const create = async (displayName, email, password, image) => {
  const { error } = validatorJoi.validate({ displayName, email, password, image });
  if (error) throw objerror(400, error.message);
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) throw objerror(409, 'User already registered');
  const { dataValues } = await User.create({ displayName, email, password, image });
  return dataValues;
};

const list = async () => {
  const result = await User.findAll();
  return result;
};

const findId = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw objerror(404, 'User does not exist');
  console.log('aqui ese que eu quero: ', user);
  return user;
};
 
module.exports = {
  create,
  list,
  findId,
};
