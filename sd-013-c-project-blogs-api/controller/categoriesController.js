const express = require('express');
const validatJWT = require('../auth/validatJWT');

const router = express.Router();
const categoriesService = require('../service/categoriesService');

router.post('/', validatJWT, async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await categoriesService.create(name);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', validatJWT, async (req, res, next) => {
  try {
    const result = await categoriesService.list();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
