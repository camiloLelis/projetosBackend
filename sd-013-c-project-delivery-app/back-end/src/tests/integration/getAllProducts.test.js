const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../../api/app');
const { product, user } = require('../../database/models');
const utils = require('../../utils');
const productMock = require('../mocks/productMocks');
const userMock = require('../mocks/userMocks')

const { expect } = chai;
const { stub } = sinon;
chai.use(chaiHttp);

describe('GET /product', () => {
  describe('Quando o token está associado a um usuário inexistente', () => {
    let response;
    beforeEach(async () => {
      stub(jwt, 'verify').resolves({ email: userMock.findOneReturn.email });
      stub(user, 'findOne').resolves();
      response = await chai.request(app)
        .get('/product')
        .set('Authorization', 'tokenFalso')
    })
  
    afterEach(() => {
      sinon.verifyAndRestore();
    })

    it('A requisição deve responder com um status 401', async () => {
        expect(response).to.have.status(401)
    });
  });

  describe('Quando o token é valido', () => {
    let response;
    beforeEach(async () => {
      stub(product, 'findAll').resolves(productMock.findAllMock);
      stub(user, 'findOne').resolves(userMock.findOneReturn);
      stub(jwt, 'verify').resolves({ email: userMock.findOneReturn.email })
      response = await chai.request(app)
        .get('/product')
        .set('Authorization', 'tokenFalso')
    })

    afterEach(() => {
      sinon.restore()
    })
  
    it('A requisição deve responder com um status 200', () => {
      expect(response).to.have.status(200)
    });
  
    it('E um array de produtos na chave products do body', () => {
      expect(response.body).to.be.deep.equal({ products: productMock.findAllMock })
    });
  });

  describe('Quando o token não é passado', () => {
    it('A requisição deve responder com um status 409', async () => {
        const response = await chai.request(app).get('/product');
        expect(response).to.have.status(409)
    });
  });
});
