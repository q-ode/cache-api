const router = require('express').Router();
const cacheCtrl = require('../../controllers/cacheCtrl');

router.route('/').get(cacheCtrl.index);

module.exports = router;
