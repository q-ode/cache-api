const chai = require('chai');
const Cache = require('../../models/cache');

const expect = chai.expect;

describe('Cache Model', () => {
  describe('Save', () => {
    it('saves data as expected', (done) => {
      Cache.create({ key: 'dummy', value: 'sample' }, function (err, cache) {
        expect(cache.key).to.equal('dummy');
        expect(cache.value).to.equal('sample');

        expect(err).to.equal.undefined;
        done();
      });
    });

    it('validates input data as expected', (done) => {
      Cache.create({ key: 'dummy'}, function (err, cache) {
        expect(err.name).to.exist;
      });

      Cache.create({ value: 'dummy'}, function (err, cache) {
        expect(err.name).to.exist;
        done();
      });
    })
  });
});
