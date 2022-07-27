const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('../routes');
const { error } = require('../middlewares');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', routes.user);
app.use('/admin', routes.admin);
app.use('/login', routes.login);
app.use('/product', routes.product);
app.use('/sale', routes.sale);

app.use(error);

module.exports = app;
