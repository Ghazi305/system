const express = require('express');
const router = express.Router(); 
const accountRouteGroup = require('../app/controller/AccountGroupController');

router.get('/index', accountRouteGroup.index);

router.get('/getAccount/:id', accountRouteGroup.getAccountGroupById);

router.post('/create', accountRouteGroup.create);

router.put('/update/:id', accountRouteGroup.update);

router.delete('/delete/:id', accountRouteGroup.delete);


module.exports = router; 