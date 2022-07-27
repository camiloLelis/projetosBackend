const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const serviceLogin = require('../service/serviceLogin');

const secret = process.env.JWT_SECRET;

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newLogin = await serviceLogin.login(email, password);

    const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

      const { password: _password, ...userWithoutPassword } = newLogin;

      const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
});
module.exports = router;