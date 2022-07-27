const rescue = require('express-rescue');
const sales = require('../services/sales');

const createSales = rescue(async (req, res, next) => {
  try {
    const { body } = req;
    const bodyBd = await sales.createSalesService(body);
    res.status(200).json(bodyBd); 
  } catch (error) {
    return next(error);
  }
});

const listSales = rescue(async (req, res, next) => {
  try {
    const list = await sales.listSalesService();
    res.status(200).json(list);
  } catch (error) {
    return next(error);
  }
});

const listSalesOne = rescue(async (req, res, next) => {
  const { id } = req.params;
  const viewSales = await sales.listSalesOneService(id);
  if (viewSales.error) return next(viewSales.error);
  return res.status(200).json(viewSales);
});

const updateSalesControllers = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
/*   console.log(req.body[0]); */
  const update = await sales.updateSalesServices(id, productId, quantity);
  if (!update) return next(update.error);
  // console.log('UPDATE em controlles: ', update);
  return res.status(200).json({ _id: id, itensSold: [{ productId, quantity }] });
});

const delSalesControllers = rescue(async (req, res, next) => {
  const { id } = req.params;
  const del = await sales.delSalesService(id);
  if (del.err) return next(del.error);
  return res.status(200).json(del);
});

module.exports = {
  createSales,
  listSales,
  listSalesOne,
  updateSalesControllers,
  delSalesControllers,
};