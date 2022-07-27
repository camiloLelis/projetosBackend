// referencia https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/8b1a25dd-aca5-4a05-bdae-d1e335f454e6/implementando-jwt/16dc94bb-35ba-4bf3-92ef-ac8a5d8e3006?use_case=side_bar

const jwt = require('jsonwebtoken');
const model = require('../models/UserModels');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */
    const user = await model.findUserOne(decoded.data.email);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
      /* console.log('decoded.data: ', decoded.data); */
      
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};