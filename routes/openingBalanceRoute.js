const express = require('express');
const router = express.Router(); 
const OpeningBalanceController = require('../app/controller/OpeningBalanceController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, OpeningBalanceController.index);

router.post('/create', authMiddleware, OpeningBalanceController.create);

router.get('/check/:fiscalYearId', authMiddleware, OpeningBalanceController.checkBalance);

router.get('/getByFiscalYear/:fiscalYearId', authMiddleware, OpeningBalanceController.getByFiscalYear);


module.exports = router; 