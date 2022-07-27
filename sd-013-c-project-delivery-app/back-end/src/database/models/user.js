const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordRaw: DataTypes.VIRTUAL,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      hooks: {
        beforeSave: async (user) => {
          if (user.passwordRaw) {
            user.password = crypto.createHash('md5').update(user.passwordRaw).digest("hex");
          }
        },
      },
    }
  );
  
  user.associate = (models) => {
    user.hasMany(models.sale,
      { foreignKey: 'userId', as: 'saleUser'}
    );
    user.hasMany(models.sale,
      { foreignKey: 'sellerId', as: 'saleSeller'}
    );
  };

  return user;
};
