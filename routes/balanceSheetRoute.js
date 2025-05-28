const express = require('express');
const router = express.Router(); 
const balanceSheetController = require('../app/controller/BalanceSheetController');

router.get('/getBalanceSheet', balanceSheetController.getBalanceSheet);


module.exports = router; 