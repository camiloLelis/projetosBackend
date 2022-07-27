const crypto = require('crypto');
const { user } = require('../database/models');
const userSchema = require('../schemas/user.schema');
const loginSchema = require('../schemas/login.schema');
const { validateError, generateToken } = require('../utils');

const createUser = async (input) => {
  const { error } = userSchema.validate(input);
  if (error) throw validateError(400, error.message);

  const userExists = await user.findOne({ where: { email: input.email } });
  if (userExists) throw validateError(409, 'user already registered');

  const { name, email, role } = input;
  const token = generateToken(email);
  const newUser = await user.create(input);
  return { name, email, role, token, id: newUser.id };
};

const createByAdmin = async (input, admin) => {
  if (admin.role !== 'administrator') throw validateError(403, 'you do not have permission');

  const { error } = userSchema.validate(input);
  if (error) throw validateError(400, error.message);

  const userExists = await user.findOne({ where: { email: input.email } });
  if (userExists) throw validateError(409, 'user already registered');

  const { name, email, role } = input;
  await user.create(input);
  return { name, email, role };
};

const loginUser = async (input) => {
  const { error } = loginSchema.validate(input);
  if (error) {
    throw validateError(400, error.message);
  }

  const { email, password } = input;
  const HashPassword = crypto.createHash('md5').update(password).digest('hex');

  const userExists = await user.findOne({ where: { email, password: HashPassword } });
  if (!userExists) {
    throw validateError(404, 'invalid email or password');
  }

  const token = generateToken(email);
  const { name, role, id } = userExists;

  return { name, email, role, token, id };
};

const getAll = async () => {
  const users = await user.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const deleteUser = async (id, { role }) => {
  if (role !== 'administrator') throw validateError(403, 'you do not have permission');
  
  const deletedUser = await user.findByPk(
    id, { attributes: { exclude: ['password'] } },
  );
  
  const deleteStatus = await user.destroy({
    where: { id },
  });

  if (deleteStatus !== 1) throw validateError(400, 'no user was deleted');

  return deletedUser;
};

module.exports = {
  createUser,
  loginUser,
  getAll,
  deleteUser,
  createByAdmin,
};
