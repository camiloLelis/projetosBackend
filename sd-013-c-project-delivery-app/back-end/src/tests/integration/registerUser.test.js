const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const { user } = require('../../database/models');
const userMock = require('../mocks/userMocks')

const { expect } = chai;
const { stub } = sinon;
chai.use(chaiHttp);

describe('POST /user', () => {
  describe('Registrar um usuário sem o campo name', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/user')
        .send(userMock.missingName);
    });

    it('deve responder com um status 400', () => {
      expect(response).to.have.status(400)
    });

    it('deve responder com a mensagem: "name" is required', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('"name" is required');
    });
  });

  describe('Registrar um usuário com um email já registrado no banco', () => {
    let response;

    before(async () => {
      stub(user, 'findOne').resolves(userMock.findOneReturn);
      response = await chai.request(app)
        .post('/user')
        .send(userMock.validUser);
    });

    afterEach(() => {
      sinon.restore()
    });

    it('deve responder com um status 409', async () => {
      expect(response).to.have.status(409)
    });

    it('deve responder com a mensagem: user already registered', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('user already registered');
    });
  });

  describe('Registrar um usuário com sucesso', () => {
    let response;

    before(async () => {
      stub(user, 'create').resolves(userMock.newUser);
      response = await chai.request(app)
        .post('/user')
        .send({
          name: userMock.newUser.name,
          email: userMock.newUser.email,
          passwordRaw: '123456',
          role: 'customer'
        });
    });

    afterEach(() => {
      sinon.verifyAndRestore()
    });

    it('deve responder com um status 201', async () => {
      expect(response).to.have.status(201)
    });

    it('deve responder com um objeto user contendo name, role, token e email', () => {
      expect(response.body).to.have.property('user');
      expect(response.body.user.email).to.be.deep.equal(userMock.newUser.email);
    });
  });
});


