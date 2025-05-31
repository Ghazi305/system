const express = require('express');
const router = express.Router(); 
const balanceSheetController = require('../app/controller/BalanceSheetController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/getBalanceSheet',authMiddleware,  balanceSheetController.getBalanceSheet);


module.exports = router; 