const express = require('express');
const router = express.Router(); 
const accountTypeController = require('../app/controller/AccountTypeController');

router.get('/index', accountTypeController.index);

router.get('/getAccount/:id', accountTypeController.getAccountTypeById);

router.post('/create', accountTypeController.create);

router.put('/update/:id', accountTypeController.update);

router.delete('/delete/:id', accountTypeController.delete);


module.exports = router; 