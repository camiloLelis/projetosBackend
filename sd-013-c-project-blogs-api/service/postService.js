// referencia: https://github.com/tryber/sd-013-c-project-blogs-api/blob/cassio-pereira-sd-013-project-blogs-api/services/posts.js
const Joi = require('joi');
const { BlogPost, Categorie, PostsCategorie, User } = require('../models');
const objerror = require('../uteis/objerror');

const validatorJoi = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.array().min(1).required(),  
});

const create = async (title, content, userId, categoryIds) => {
  const { error } = validatorJoi.validate({ title, content, categoryIds });
  if (error) throw objerror(400, error.message);
  const categoryIdFind = await Promise.all(categoryIds
    .map(async (id) => Categorie.findOne({ where: { id } })));
  
  if (!categoryIdFind.every((categorie) => categorie)) {
    throw objerror(400, '"categoryIds" not found');
  }
  const dataValues = await BlogPost
    .create({ title, content, userId, published: Date.now(), updated: Date.now() });
    // precisa do forEach em categoryIds 
    await categoryIds.forEach(async (id) => {
      await PostsCategorie.create(
        { postId: 2, categoryId: id },
      );
    });
  return dataValues;
};

const find = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
  ],
  });
  return posts;
};
 
module.exports = {
  create,
  find,
};