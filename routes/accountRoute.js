const express = require('express');
const router = express.Router(); 
const accountController = require('../app/controller/AccountController');
const authMiddleware = require('../app/middleware/authMiddleware');

router.get('/index', authMiddleware, accountController.index);

router.get('/getAccount/:id', authMiddleware, accountController.getAccountById);

router.post('/create', authMiddleware, accountController.create);

router.put('/update/:id', authMiddleware, accountController.update);

router.delete('/delete/:id', authMiddleware, accountController.deleteAccount);


module.exports = router; 