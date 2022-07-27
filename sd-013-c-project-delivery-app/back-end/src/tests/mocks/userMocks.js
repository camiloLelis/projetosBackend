const validUser = {
  name: 'teste',
  email: 'testaaae@gmail.com',
  passwordRaw: '123456',
  role: 'customer',
}

const newUser = {
  id: 10,
  name: 'newUser',
  email: 'newuser@gmail.com',
  role: 'customer',
};

const missingName = {
  email: 'teste@email.com',
  passwordRaw: '123456',
  role: 'custumer',
};

const missingPassword = {
  name: 'Teste',
  email: 'teste@email.com',
  role: 'customer',
};

const findOneReturn = {
  email: 'teste@gmail.com',
  id: 4,
  name: 'teste',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  role: 'customer',
};

module.exports = {
  missingName,
  missingPassword,
  findOneReturn,
  validUser,
  newUser,
};
