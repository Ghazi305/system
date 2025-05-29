const express = require('express');
const router = express.Router(); 
const OpeningBalanceController = require('../app/controller/OpeningBalanceController');

router.get('/index', OpeningBalanceController.index);

router.post('/create', OpeningBalanceController.create);

router.get('/check/:fiscalYearId', OpeningBalanceController.checkBalance);

router.get('/getByFiscalYear/:fiscalYearId', OpeningBalanceController.getByFiscalYear);


module.exports = router; 