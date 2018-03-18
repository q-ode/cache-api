const Log = require('log'),
  log = new Log('info');
const random = require('random-string');

const Cache = require('../models/cache');

const randomDataProp = { length: 100 };

/**
 * The controller for the Cache resource
 */
const cacheCtrl = {
  /**
   * Get a single cache record by the key, if the key doesn't exist,
   * it creates a random value, updates the cache with the key specified
   * and then returns that value.
   *
   * @param req - HTTP Request containing the key
   * @param res - HTTP Response
   *
   * @return Object - a single cache record
   */
  get(req, res) {
    const key = req.params.key;

    Cache.findOne({ key: key }).then((record) => {
      if (record) {
        log.error('Cache hit');

        return res.send({ key, value: record.value });
      } else {
        log.error('Cache miss');

        const value = random(randomDataProp);
        Cache.create({ key, value }, (err, data) => {
          return res.send({ key, value: data.value });
        });
      }
    });
  },

  /**
   * Get all the records from the cache
   *
   * @param req - HTTP Request containing the key
   * @param res - HTTP Response
   *
   * @return Array - all cache records
   */
  getAll(req, res) {
    Cache.find({}).then((data) => {

      const totalCache = data.map((record) => {
        return { key: record.key, value: record.value }
      });

      return res.send(totalCache);
    });
  }
};

module.exports = cacheCtrl;
