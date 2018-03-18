const cache = require('./cache');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'CacheAPI V1.0' });
  });

  app.use('/cache', cache);
};
