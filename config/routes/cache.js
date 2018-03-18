const router = require('express').Router();
const cacheCtrl = require('../../controllers/cacheCtrl');

router.route('/:key').get(cacheCtrl.get);
router.route('/').get(cacheCtrl.getAll);
router.route('/').post(cacheCtrl.save);
router.route('/:key').delete(cacheCtrl.remove);

module.exports = router;
