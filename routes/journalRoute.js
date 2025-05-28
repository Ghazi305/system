const express = require('express');
const router = express.Router(); 
const journalController = require('../app/controller/JournalController');

router.get('/index', journalController.index);

router.post('/create', journalController.create);

router.put('/update/:id', journalController.update);

router.delete('/delete/:id', journalController.delete);


module.exports = router; 