const bodyParse = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const recipeController = require('./controllers/recipeController');
const validateJWT = require('./auth/validateJWT');
const errorMidlle = require('./middlewares/midlleErro');

const app = express();
app.use(bodyParse.json());

// tirado de : https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', userController.createUserController);
app.post('/login', loginController.loginUserController);
app.post('/recipes', validateJWT, recipeController.recipeInsertController);
app.get('/recipes', recipeController.recipeListController);
app.get('/recipes/:id', recipeController.recipeOneController);
app.put('/recipes/:id', validateJWT, recipeController.recipeEditController);
app.delete('/recipes/:id', validateJWT, recipeController.recipeDelController);
app.put('/recipes/:id/image', 
  validateJWT, recipeController.recipeImageController, upload.single('image'));
// rota para servir as imagens (requisito 10)
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

app.use(errorMidlle);

module.exports = app;
