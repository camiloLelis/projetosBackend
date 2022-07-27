const express = require('express');
const bodyParse = require('body-parser');
const error = require('./middleware/error');
const products = require('./controllers/products');
const sales = require('./controllers/sales');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send({ sei: 'la' });
});

app.post('/products', products.create);

app.get('/products', products.listProducts);
app.get('/products/:id', products.findForId);
app.put('/products/:id', products.editProductControllers);
app.delete('/products/:id', products.delProductControllers);

app.post('/sales', sales.createSales);
app.get('/sales', sales.listSales);
app.get('/sales/:id', sales.listSalesOne);
app.put('/sales/:id', sales.updateSalesControllers);
app.delete('/sales/:id', sales.delSalesControllers);

app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});