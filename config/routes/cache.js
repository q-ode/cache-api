const router = require('express').Router();
const cacheCtrl = require('../../controllers/cacheCtrl');

router.route('/:key').get(cacheCtrl.get);

module.exports = router;
