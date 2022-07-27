// referencia https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/8b1a25dd-aca5-4a05-bdae-d1e335f454e6/implementando-jwt/16dc94bb-35ba-4bf3-92ef-ac8a5d8e3006?use_case=side_bar

const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const segredo = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);

    const user = await User.findOne({ where: { email: decoded.data.email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found.' });
    }

    req.user = user;
   
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};