const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const JWT_SECRET = fs
    .readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), 'utf8').trim();

const validateError = (status, message) => {
  const newError = new Error(message);
  newError.status = status;

  return newError;
};

const generateToken = (email) => {
  const token = jwt.sign({ email }, JWT_SECRET);
  return token;
};

const decodeToken = (token) => {
  const data = jwt.verify(token, JWT_SECRET);
  return data;
};

module.exports = {
  validateError,
  generateToken,
  decodeToken,
};
