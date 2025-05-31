const express = require('express');
const router = express.Router(); 
const accountTypeController = require('../app/controller/AccountTypeController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, accountTypeController.index);

router.get('/getAccount/:id', authMiddleware, accountTypeController.getAccountTypeById);

router.post('/create', authMiddleware, accountTypeController.create);

router.put('/update/:id', authMiddleware, accountTypeController.update);

router.delete('/delete/:id', authMiddleware, accountTypeController.delete);


module.exports = router; 