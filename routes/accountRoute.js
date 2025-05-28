const express = require('express');
const router = express.Router(); 
const accountController = require('../app/controller/AccountController');

router.get('/index', accountController.index);

router.get('/getAccount/:id', accountController.getAccountById);

router.post('/create', accountController.create);

router.put('/update/:id', accountController.update);

router.delete('/delete/:id', accountController.deleteAccount);


module.exports = router; 