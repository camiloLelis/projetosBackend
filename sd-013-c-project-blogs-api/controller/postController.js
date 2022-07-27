const express = require('express');
const validatJWT = require('../auth/validatJWT');

const router = express.Router();
const postService = require('../service/postService');

router.post('/', validatJWT, async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    const result = await postService.create(title, content, userId, categoryIds);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', validatJWT, async (req, res, next) => {
  try {
    const posts = await postService.find(req.user.id);
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;