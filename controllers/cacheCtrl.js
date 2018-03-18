const Log = require('log'),
  log = new Log('info');
const random = require('random-string');

const Cache = require('../models/cache');

const randomDataProp = { length: 100 };

/**
 * The controller for the Cache resource
 */
const cacheCtrl = {
  get(req, res) {
    const key = req.params.key;

    Cache.findOne({ key: key }).then((data) => {
      if (data) {
        log.error('Cache hit');

        return res.send({ key, value: data.value });
      } else {
        log.error('Cache miss');

        const value = random(randomDataProp);
        Cache.create({ key, value }, (err, data) => {
          return res.send({ key, value: data.value });
        });
      }
    });
  },
};

module.exports = cacheCtrl;
