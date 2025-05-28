const express = require('express');
const router = express.Router(); 
const invoiceController = require('../app/controller/InvoiceController');

router.get('/index', invoiceController.getInvoices);

router.post('/create', invoiceController.createInvoice);

router.post('/collct', invoiceController.collectInvoice);

router.post('/return', invoiceController.returnInvoice);

router.put('/update', invoiceController.updateInvoiceStatus);

router.put('/cancel', invoiceController.cancelInvoice);


module.exports = router; 