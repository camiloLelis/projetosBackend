const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { user } = require('../../database/models');
const loginMock = require('../mocks/loginMocks');
const { generateToken } = require('../../utils');

const { expect } = chai;
const { stub } = sinon;
chai.use(chaiHttp);

describe('POST /login', () => {
  describe('Tentar logar sem o campo email', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send(loginMock.missingEmail);
    });

    it('deve responder com um status 400', () => {
      expect(response).to.have.status(400)
    });

    it('deve responder com a mensagem: "email" is required', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('"email" is required');
    });
  });

  describe('Tentar logar sem o campo password', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send(loginMock.missingPassword);
    });

    it('deve responder com um status 400', () => {
      expect(response).to.have.status(400)
    });

    it('deve responder com a mensagem: "password" is required', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('"password" is required');
    });
  });

  describe('Tentar logar com um um email ou senha incorretos', () => {
    before(async () => {
      stub(user, 'findOne').resolves();
      response = await chai.request(app)
        .post('/login')
        .send(loginMock.inputs);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('deve responder com um status 404', async () => {
      expect(response).to.have.status(404)
    });

    it('deve responder com a mensagem: user already registered', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('invalid email or password');
    });
  });

  describe('Logar com um usuário válido', () => {
    before(async () => {
      stub(user, 'findOne').resolves(loginMock.findOneReturn);
      response = await chai.request(app)
      .post('/login')
      .send(loginMock.inputs);
    });

    afterEach(() => {
      sinon.verifyAndRestore();
    });

    it('deve responder com um status 200', async () => {
      expect(response).to.have.status(200)
    });

    it('deve responder com um objeto user contendo name, role, token e email', () => {
      const token = generateToken(loginMock.inputs.email)
      expect(response.body).to.have.property('user');
      const { name, email, role } = loginMock.findOneReturn;
      expect(response.body.user).to.be.deep.equal({ name, email, role, token });
    });
  });
});


