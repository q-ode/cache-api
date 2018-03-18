const app = require('../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('API Root', () => {
  it('works as expected', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
