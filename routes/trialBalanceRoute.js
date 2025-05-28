const express = require('express');
const router = express.Router(); 
const TrialBalanceController = require('../app/controller/TrialBalanceController');

router.get('/getTrialBalance', TrialBalanceController.getTrialBalance);

router.get('/compare-periods', TrialBalanceController.comparePeriods);

router.get('/date-range', TrialBalanceController.getTrialBalanceByDateRange);

router.get('/getGeneralLedger', TrialBalanceController.getGeneralLedger);


module.exports = router; 