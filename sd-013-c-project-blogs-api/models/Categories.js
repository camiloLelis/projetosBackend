const Categorie = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return Categories;
};
module.exports = Categorie;