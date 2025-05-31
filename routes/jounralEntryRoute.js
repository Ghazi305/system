const express = require('express');
const router = express.Router(); 
const journalEntryController = require('../app/controller/JournalEntriesController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/get-jounral', authMiddleware, journalEntryController.getJournalEntries);

router.post('/get-date', authMiddleware, journalEntryController.getJournalEntriesByDate);

router.put('/update/:id', authMiddleware, journalEntryController.update);

router.delete('/delete/:id', authMiddleware, journalEntryController.delete);


module.exports = router; 