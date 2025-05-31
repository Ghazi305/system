const express = require('express');
const router = express.Router(); 
const accountRouteGroup = require('../app/controller/AccountGroupController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, accountRouteGroup.index);

router.get('/getAccount/:id', authMiddleware, accountRouteGroup.getAccountGroupById);

router.post('/create', authMiddleware, accountRouteGroup.create);

router.put('/update/:id', authMiddleware, accountRouteGroup.update);

router.delete('/delete/:id', authMiddleware, accountRouteGroup.delete);


module.exports = router; 