const express = require('express');
const router = express.Router(); 
const currenciesController = require('../app/controller/CurrenciesController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, currenciesController.index);

router.post('/create', authMiddleware, currenciesController.create);

router.put('/update/:id', authMiddleware, currenciesController.update);

router.delete('/delete/:id', authMiddleware, currenciesController.delete);


module.exports = router; 