const express = require('express');
const router = express.Router(); 
const currenciesController = require('../app/controller/CurrenciesController');

router.get('/index', currenciesController.index);

router.post('/create', currenciesController.create);

router.put('/update/:id', currenciesController.update);

router.delete('/delete/:id', currenciesController.delete);


module.exports = router; 