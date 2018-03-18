const app = require('../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

const Cache = require('../../models/cache');

describe('CacheAPI', () => {
  before((done) => {
    Cache.remove().exec(() => {
      Cache.create({ key: 'john', value: 'doe' }, () => {
        done();
      });
    });
  });

  describe('Root API', () => {
    it('works, as expected', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('CacheAPI V1.0');
          done();
        });
    });
  });

  describe('Get', () => {
    it('retrieves an existing cache based on a key', (done) => {
      chai.request(app)
        .get('/cache/john')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.value).to.equal('doe');
          done();
        });
    });

    it('creates an returns a new value for unexisting key', (done) => {
      chai.request(app)
        .get('/cache/macklemore')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.value).to.exist;
          done();
        });
    });
  });

  describe('GetAll', () => {
    it('retrieves all records in the cache', (done) => {
      chai.request(app)
        .get('/cache')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
});