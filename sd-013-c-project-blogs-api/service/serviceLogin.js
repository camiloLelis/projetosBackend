const Joi = require('joi');
const { User } = require('../models');
const objerror = require('../uteis/objerror');

const validatorJoi = Joi.object({
  email: Joi.string().email().required(), 
  password: Joi.string().length(6).required(), 
});

const login = async (email, password) => {
  const { error } = validatorJoi.validate({ email, password });
  if (error) throw objerror(400, error.message);
  const dataUser = await User.findOne({ where: { email } });
  if (!dataUser || dataUser.password !== password) throw objerror(400, 'Invalid fields');
  return dataUser.dataValues;
};
 
module.exports = {
  login,
};