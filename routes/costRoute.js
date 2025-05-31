const express = require('express');
const router = express.Router(); 
const costController = require('../app/controller/CostCenterController');
const authMiddleware = require('../app/middleware/authMiddleware');

router.get('/index', authMiddleware, costController.index);

router.post('/create', authMiddleware, costController.create);

router.put('/update/:id', authMiddleware, costController.update);

router.delete('/delete/:id', authMiddleware, costController.delete);


module.exports = router; 