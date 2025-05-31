const express = require('express');
const router = express.Router(); 
const profitController = require('../app/controller/ProfitLossController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/getProfitAndLoss', authMiddleware, profitController.getProfitAndLoss);

router.get('/cost-centers-report', authMiddleware, profitController.getCostCentersReport);


module.exports = router; 