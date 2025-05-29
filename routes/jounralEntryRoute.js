const express = require('express');
const router = express.Router(); 
const journalEntryController = require('../app/controller/JournalEntriesController');

router.get('/get-jounral', journalEntryController.getJournalEntries);

router.post('/get-date', journalEntryController.getJournalEntriesByDate);

router.put('/update/:id', journalEntryController.update);

router.delete('/delete/:id', journalEntryController.delete);


module.exports = router; 