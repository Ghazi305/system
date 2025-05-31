const express = require('express');
const router = express.Router(); 
const yearController = require('../app/controller/FiscalYearController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, yearController.index);

router.post('/create', authMiddleware, yearController.create);

router.post('/close', authMiddleware, yearController.closeFiscalYear);

router.put('/update/:id', authMiddleware, yearController.update);

router.delete('/delete/:id', authMiddleware, yearController.delete);

module.exports = router; 