const rescue = require('express-rescue');
const service = require('../services/user.service');

const createUser = rescue(async (req, res, _next) => {
  const { body } = req;
  const user = await service.createUser(body);

  return res.status(201).json({ user });
});

const createByAdmin = rescue(async (req, res, _next) => {
  const { body } = req;
  const user = await service.createByAdmin(body, req.user);

  return res.status(201).json({ user });
});

const loginUser = rescue(async (req, res, _next) => {
  const { body } = req;
  const user = await service.loginUser(body);

  return res.status(200).json({ user });
});

const getAll = rescue(async (_req, res, _next) => {
  const users = await service.getAll();

  return res.status(200).json({ users });
});

const deleteUser = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const deletedUser = await service.deleteUser(id, req.user);

  return res.status(200).send({ user: deletedUser });
});

module.exports = {
  createUser,
  loginUser,
  getAll,
  deleteUser,
  createByAdmin,
};
