const express = require('express');
const router = express.Router(); 
const journalController = require('../app/controller/JournalController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, journalController.index);

router.post('/create', authMiddleware, journalController.create);

router.put('/update/:id', authMiddleware, journalController.update);

router.delete('/delete/:id', authMiddleware, journalController.delete);


module.exports = router; 