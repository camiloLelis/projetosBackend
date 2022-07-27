const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { 
    timestamps: false,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };
  return BlogPosts;
};
module.exports = BlogPost;