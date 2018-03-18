const chai = require('chai');
const Cache = require('../../models/cache');

const expect = chai.expect;

describe('Cache Model', () => {
  describe('Create', () => {
    it('saves data as expected', (done) => {
      Cache.create({ key: 'dummy', value: 'sample' }, function (err, record) {
        expect(record.key).to.equal('dummy');
        expect(record.value).to.equal('sample');

        expect(err).to.equal.undefined;
        done();
      });
    });

    it('validates input data as expected', (done) => {
      Cache.create({ key: 'dummy' }, function (err, record) {
        expect(err.name).to.exist;
      });

      Cache.create({ value: 'dummy' }, function (err, record) {
        expect(err.name).to.exist;
        done();
      });
    })
  });

  describe('FindOne', () => {
    it('finds the cache record based on the key', (done) => {
      Cache.findOne({ key: 'dummy' }, (err, record) => {
        expect(record.value).to.equal('sample');
        done();
      });
    });

    it('doesn\'t return a record when a key isn\'t found', (done) => {
      Cache.findOne({ key: 'ijdslkjdlsdnklds' }, (err, record) => {
        expect(record).to.be.null;
        done();
      });
    });
  });

  describe('RemoveOne', () => {
    it('deletes a record based on a key', (done) => {
      Cache.remove({ key: 'dummy' }, (err, data) => {
        expect(data.n).to.be.equal(1);
        done();
      });
    });
  });
});
