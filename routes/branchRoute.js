const express = require('express');
const router = express.Router(); 
const branchController = require('../app/controller/BranchController');

router.get('/index', branchController.index);

router.get('/getAccount/:id', branchController.getBranchById);

router.post('/create', branchController.create);

router.put('/update/:id', branchController.update);

router.delete('/delete/:id', branchController.delete);


module.exports = router; 