const rescue = require('express-rescue');
const { user } = require('../database/models');
const { decodeToken, validateError } = require('../utils');

module.exports = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw validateError(409, 'Missing auth token');
  }

  let payload;
  try {
    payload = decodeToken(token);
  } catch (err) {
    throw validateError(400, 'Invalid signature');
  }

  const registeredUser = await user.findOne({ where: { email: payload.email } });
  if (!registeredUser) {
    throw validateError(401, 'User not registered');
  }

  req.user = registeredUser;

  return next();
});
