const express = require('express');
const router = express.Router(); 
const profitController = require('../app/controller/ProfitLossController');

router.get('/getProfitAndLoss', profitController.getProfitAndLoss);

router.get('/cost-centers-report', profitController.getCostCentersReport);


module.exports = router; 