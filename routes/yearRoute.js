const express = require('express');
const router = express.Router(); 
const yearController = require('../app/controller/FiscalYearController');

router.get('/index', yearController.index);

router.post('/create', yearController.create);

router.post('/close', yearController.closeFiscalYear);

router.put('/update/:id', yearController.update);

router.delete('/delete/:id', yearController.delete);

module.exports = router; 