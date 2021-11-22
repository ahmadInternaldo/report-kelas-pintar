const router = require('express').Router();
const ReportController = require('../controllers/reportController');

router.get('/report', ReportController.show);

module.exports = router;
