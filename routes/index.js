const router = require('express').Router();
const user = require('./login');
const report = require('./report');
const authentication = require('../middlewares/authetication');

router.use(user);
router.use(authentication);
router.use(report);

module.exports = router;
