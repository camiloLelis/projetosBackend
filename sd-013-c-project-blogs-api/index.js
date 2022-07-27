const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controller/usersController');
const loginController = require('./controller/loginController');
const categoriesController = require('./controller/categoriesController');
const postController = require('./controller/postController');
const errorMiddle = require('./MiddleError/errorMiddle');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', usersController);
app.use('/login', loginController);
app.use('/categories', categoriesController);
app.use('/post', postController);

app.use(errorMiddle);