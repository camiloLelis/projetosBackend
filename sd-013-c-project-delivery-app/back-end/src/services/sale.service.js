const { Op } = require('sequelize');
const { sale } = require('../database/models');
const saleSchema = require('../schemas/sale.schema');
const { validateError } = require('../utils');

const create = async (input) => {
  const { error } = saleSchema.validate(input);

  if (error) throw validateError(400, error.message);

  const newSaleProduct = await sale.create(input);

  return newSaleProduct;
};

const getById = async (id) => {
  const saleById = await sale.findByPk(id);

  return saleById;
};

const getAll = async (id) => {
  const sales = await sale.findAll({
    where: {
      [Op.or]: [
        { sellerId: id },
        { userId: id },
      ],
    },
  });

  return sales;
};

const editStatusById = async (id, status) => {
  const statusArray = ['Pendente', 'Preparando', 'Entregue', 'Em Trânsito'];
  if (!statusArray.includes(status)) throw validateError(400, 'Invalid status');

  const updatedSale = await sale.update({ status },
    { where: { id }, returning: true });

  return updatedSale;
};

module.exports = {
  create,
  getById,
  getAll,
  editStatusById,
};
