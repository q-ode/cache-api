const app = require('../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');
const random = require('random-string');

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

  describe('Save', () => {
    it('saves a record in the cache', (done) => {
      chai.request(app)
        .post('/cache')
        .send({ key: random({ length: 10 }), value: random({ length: 100 }) })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('doesn\'t save a record when a parameter is missing', (done) => {
      chai.request(app)
        .post('/cache')
        .send({ key: random({ length: 10 }) })
        .end((err, res) => {
          expect(res).to.have.status(400);
        });

      chai.request(app)
        .post('/cache')
        .send({ value: random({ length: 100 }) })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

  describe('Remove', () => {
    it('deletes a record by key as expected', (done) => {
      chai.request(app)
        .delete('/cache/john')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns an error if they record isn\'t found', (done) => {
      chai.request(app)
        .delete('/cache/john')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});