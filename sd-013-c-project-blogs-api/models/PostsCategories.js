// ref: https://app.betrybe.com/course/back-end/arquitetura-solid-e-orm/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d/conteudos/21cb46cb-13a3-453c-97ae-df69a7141ce7/relacionamentos-nn/34463014-9efa-4426-90f4-c40a1f84c2bd?use_case=side_bar
 const PostsCategorie = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategorie',
    {},
    { timestamps: false });
  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};
module.exports = PostsCategorie;