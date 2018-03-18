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
        Cache.create({ key, value }).then((data) => {
          return res.send({ key, value: data.value });
        });
      }
    });
  },

  /**
   * Get all the records from the cache
   *
   * @param req - HTTP Request
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
  },

  /**
   * Creates a cache key with the value or updates it if already exists.
   *
   * @param req - HTTP Request containing the key and value
   * @param res - HTTP Response
   *
   * @return Object - cache record for given key
   */
  save(req, res) {
    const key = req.body.key;
    const value = req.body.value;

    if (!key || !value || key === '' || value === '') {
      res.status(400).send({ message: 'Invalid parameters.' });
    } else {
      Cache.create({ key, value }).then((data) => {
        return res.send({ key, value: data.value });
      });
    }
  },

  /**
   * Removes a cache record based on the given key.
   *
   * @param req - HTTP Request containing the key
   * @param res - HTTP Response
   */
  remove(req, res) {
    const key = req.params.key;

    if (!key || key === '') {
      res.status(400).send({ message: 'Invalid parameters.' });
    } else {
      Cache.remove({ key }).then((data) => {
        if (data.n === 1) {
          return res.send({ message: 'Record deleted.' });
        } else {
          return res.status(404).send({ message: 'Record not found.' });
        }
      });
    }
  },

  /**
   * Removes all records in the cache.
   *
   * @param req - HTTP Request containing the key
   * @param res - HTTP Response
   */
  removeAll(req, res) {
    Cache.remove().exec(() => {
      return res.send({ message: 'All records deleted.' })
    });
  }
};

module.exports = cacheCtrl;
