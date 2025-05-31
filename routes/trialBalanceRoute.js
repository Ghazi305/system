const express = require('express');
const router = express.Router(); 
const TrialBalanceController = require('../app/controller/TrialBalanceController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/getTrialBalance', authMiddleware, TrialBalanceController.getTrialBalance);

router.get('/compare-periods', authMiddleware, TrialBalanceController.comparePeriods);

router.get('/date-range', authMiddleware, TrialBalanceController.getTrialBalanceByDateRange);

router.get('/getGeneralLedger', authMiddleware, TrialBalanceController.getGeneralLedger);


module.exports = router; 