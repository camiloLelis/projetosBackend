const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const token = require('./auxiliares/token.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fileTalkerJson = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// criar pasta para estas funções, (modularizar) 

// primeiro requisito
const fileResponse = () => {
  const arrayTalker = fs.readFileSync(fileTalkerJson);
  const arrayTalkerjson = JSON.parse(arrayTalker);
  try {
    return arrayTalkerjson;
  } catch (error) {
    return [];
  }
};

const talkerRouteAnswer = (_request, response) => { 
  const fileResponseConst = fileResponse(); 
  return response.status(200).json(fileResponseConst); 
};
// -----------------------
// funcoes do segundo requisito
const talkerRouteAnswerId = (request, response) => {
  const { id } = request.params;
  const array = fileResponse();
  const talkerId = array.find((a) => a.id === Number(id));
  if (!talkerId) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talkerId);
};
//----------------------------------------
// funcoes terceiro requisito
  const loginRoute = (request, response) => {
  const { email, password } = request.body;
  const generator = token(16);
// linhas 57 e 58 tiradas  email regex> https://github.com/tryber/sd-013-c-project-talker-manager/blob/dev-lucasteixeira-project-talker-manager/middleware/login.js
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidator = emailRegex.test(email);
  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (!emailValidator) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    if (password.length <= 6) {
      return response.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
  return response.status(200).json({ token: generator });
  };

//----------------------------------------

// quarto requisito
const tokenValidade = (req, response, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization || authorization === '') {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  
  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  next();
};

const nameValidade = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
   next();
};

const agevalidade = (request, response, next) => {
  let { age } = request.body;
  age = parseInt(age, 10);
  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) { 
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
// regex para data : https://github.com/tryber/sd-013-c-project-talker-manager/blob/MuriloRibeiro-ProjetoTalker/middlewares/validateTalker.js

// eslint-disable-next-line complexity
const talkValidadeTwo = (request, response, next) => {
 /*  const { talk: { watchedAt, rate } } = request.body */
 const { talk } = request.body;
 console.log(talk);
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const testRegexDate = regexDate.test(talk.watchedAt);
  if (!testRegexDate) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number.isInteger(talk.rate) === 'false' || talk.rate > 5 || talk.rate < 1) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  /* request.talk = talk; */
   next();
};

const talkValidade = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt) {
    return response.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
 next();
};

const talkValidadeTree = (request, response, next) => {
  const { talk } = request.body;
  if (!talk.rate || talk.watchedAt === '' || talk.rate === '') {
    return response.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
 next();
};

const addTalker = (request, response, _next) => {
  // função feita com referencia: https://github.com/tryber/sd-013-c-project-talker-manager/blob/MuriloRibeiro-ProjetoTalker/middlewares/generateTalker.js
  const { name, age, talk } = request.body;
  let id;
  let talkerFile;
  try {
    talkerFile = JSON.parse(fs.readFileSync(fileTalkerJson, 'utf8'));
    id = talkerFile.reduce((acc) => acc + 1, 1);
    talkerFile.push({ name, age, id, talk });
    fs.writeFileSync(fileTalkerJson, JSON.stringify(talkerFile));
  } catch (error) {
    response.status(400).send(error.message);
  }
  response.status(201).json({ id, name, age, talk });
};

//----------------------------------------

// quinto requisito
const editTalker = (request, response) => {
  let talkerFile;
  try {
    const { name, age, talk } = request.body;
    // console.log(name, age, talk);
    const { id: idParams } = request.params;
    const id = Number(idParams);
    const talker = { id, name, age, talk };
    talkerFile = JSON.parse(fs.readFileSync(fileTalkerJson, 'utf8'));
    const talkerFileEdit = talkerFile.map((element) => {
        if (element.id === id) return talker;
        return element;
      });
      fs.writeFileSync(fileTalkerJson, JSON.stringify(talkerFileEdit));
      response.status(200).json(talker);
    } catch (error) {
      response.status(400).send(error.message);
    }
};

//----------------------------------------

// sexto requisito
const delTalker = (request, response) => {
  let talkerFile;
  const msg = { message: 'Pessoa palestrante deletada com sucesso' };
  try {
    const { id } = request.params;
    const idParams = Number(id);
    talkerFile = JSON.parse(fs.readFileSync(fileTalkerJson, 'utf8'));
    const talkerFileEdit = talkerFile.filter((element) => element.id !== idParams);
    fs.writeFileSync(fileTalkerJson, JSON.stringify(talkerFileEdit));
    response.status(200).json(msg);
  } catch (error) {
  response.status(400).send(error.message);
  }
};

//----------------------------------------

// sétimo requisito
//----------------------------------------

// rotas com seus verbos

// verbo GET
app.get('/talker', talkerRouteAnswer);
app.get('/talker/:id', talkerRouteAnswerId);

// verbo POST
app.post('/login', loginRoute);
app.post('/talker', 
  tokenValidade, 
  nameValidade, 
  agevalidade, 
  talkValidade, 
  talkValidadeTwo, 
  talkValidadeTree,
  addTalker);

app.put('/talker/:id', 
  tokenValidade, 
  nameValidade, 
  agevalidade, 
  talkValidade, 
  talkValidadeTwo,
  talkValidadeTree, 
  editTalker);

app.delete('/talker/:id', tokenValidade, delTalker);