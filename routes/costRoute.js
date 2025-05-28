const express = require('express');
const router = express.Router(); 
const costController = require('../app/controller/CostCenterController');

router.get('/index', costController.index);

router.post('/create', costController.create);

router.put('/update/:id', costController.update);

router.delete('/delete/:id', costController.delete);


module.exports = router; 