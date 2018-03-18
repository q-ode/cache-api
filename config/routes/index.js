module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'CacheAPI V1.0' });
  });
};
