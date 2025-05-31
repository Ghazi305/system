const express = require('express');
const router = express.Router(); 
const branchController = require('../app/controller/BranchController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, branchController.index);

router.get('/getAccount/:id', authMiddleware, branchController.getBranchById);

router.post('/create', authMiddleware, branchController.create);

router.put('/update/:id', authMiddleware, branchController.update);

router.delete('/delete/:id', authMiddleware, branchController.delete);


module.exports = router; 