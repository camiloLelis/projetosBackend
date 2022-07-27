const express = require('express');
const jwt = require('jsonwebtoken');
const validatJWT = require('../auth/validatJWT');

const router = express.Router();
const serviceUser = require('../service/serviceUser');

const secret = process.env.JWT_SECRET;

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await serviceUser.create(displayName, email, password, image);

    const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

      const { password: _password, ...userWithoutPassword } = newUser;

      const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  
      return res.status(201).json({ token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
});

const findAll = async (req, res, next) => {
  try {
    const result = await serviceUser.list();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

router.get('/', validatJWT, findAll);

router.get('/:id', validatJWT, async (req, res, next) => {
  try {
    const userId = await serviceUser.findId(req.params.id);
    return res.status(200).json(userId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
