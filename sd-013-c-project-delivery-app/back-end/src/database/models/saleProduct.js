module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'saleProduct',
    {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'salesProducts',
    }
  );

  saleProduct.associate = (models) => {
    models.sale.belongsToMany(models.sale, {
      as: 'sale',
      foreignKey: 'saleId',
      through: saleProduct,
      otherKey: 'productId'
    });
    models.product.belongsToMany(models.product, {
      as: 'product',
      foreignKey: 'productId',
      through: saleProduct,
      otherKey: 'saleId'
    });
  }

  return saleProduct;
};
