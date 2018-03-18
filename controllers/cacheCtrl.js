/**
 * The controller for the Cache resource
 */
const cacheCtrl = {
  index(req, res) {
    res.send({ message: 'cache' });
  }
};

module.exports = cacheCtrl;
