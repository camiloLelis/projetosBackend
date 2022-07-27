module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define(
    'sale',
    {
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING(200),
      deliveryNumber: DataTypes.STRING(55),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(55),
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  sale.associate = (models) => {
    sale.belongsTo(models.user,
      { foreignKey: 'userId', as: 'user' },
    );
    sale.belongsTo(models.user,
      { foreignKey: 'sellerId', as: 'seller' },
    );
  }

  return sale;
};
