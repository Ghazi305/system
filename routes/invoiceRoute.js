const express = require('express');
const router = express.Router(); 
const invoiceController = require('../app/controller/InvoiceController');
const authMiddleware = require('../app/middleware/authMiddleware');


router.get('/index', authMiddleware, invoiceController.getInvoices);

router.post('/create', authMiddleware, invoiceController.createInvoice);

router.post('/collct', authMiddleware, invoiceController.collectInvoice);

router.post('/return', authMiddleware, invoiceController.returnInvoice);

router.put('/update', authMiddleware, invoiceController.updateInvoiceStatus);

router.put('/cancel', authMiddleware, invoiceController.cancelInvoice);


module.exports = router; 