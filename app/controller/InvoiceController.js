const { Invoice, InvoiceItem, InvoicePayment, Payment, Account, JournalEntry, Journal, FiscalYear } = require('../database/models');
const Helpers = require('../utils/Helpers');


class InvoiceController {
  static async createInvoice(req, res) {
    console.log('req.body:', req.body);

    const { customerName, totalAmount, invoiceType, description, items, payment } = req.body

    try {
      
      const invoiceNumber = await Helpers.generateUniqueInvoiceNumber();
      
      const invoice = await Invoice.create({
        invoiceNumber: invoiceNumber,
        customerName,
        totalAmount,
        invoiceType,
        status: 'pending',
        description,
      });
 
      if (items && items.length > 0) {
        for (let item of items) {
          await InvoiceItem.create({
            invoiceId: invoice.id,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
          });
        }
      }
      
      const referenceNumber = await Helpers.generateUniqueReferenceNumber();
      if (payment) {
        const paymentRecord = await Payment.create({
          amount: payment.amount,
          method: payment.method,
          reference: referenceNumber,
          description: payment.description,
          date: new Date(),
          invoiceId: invoice.id,
        });
  
        await InvoicePayment.create({
          invoiceId: invoice.id,
          paymentId: paymentRecord.id,
          amount: paymentRecord.amount,
        });
      }
  
      return res.status(201).json({
        message: 'Invoice created successfully',
        invoice,
      });
  
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating invoice',
        error: error.message,
      });
    }
  }
  
  static async getInvoices(req, res) {
    try {
      const invoices = await Invoice.findAll({
        include: [
          {
            model: InvoiceItem,
            as: 'item', 
          },
          {
            model: InvoicePayment,
            as: 'paymentMethods',
            include: [
              {
                model: Payment,
                as: 'payment', 
              }
            ]
          },
        ],
      } );
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching invoices',
        error: error.message,
      });
    }
  }
  
  static async collectInvoice(req, res) {
    const { invoiceId, method, reference, description, fiscalYearId, debitAccountId, creditAccountId } = req.body;
  
    try {
      const invoice = await Invoice.findByPk(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      const payment = await Payment.create({
        invoiceId: invoice.id,
        date: new Date(),
        amount: invoice.totalAmount,
        method,
        reference,
        description
      });
  
      await InvoicePayment.create({
        invoiceId: invoice.id,
        paymentId: payment.id,
        amount: invoice.totalAmount
      });
  
      invoice.status = 'paid';
      invoice.processedAt = new Date();
      await invoice.save();
      
      const fiscalYear = await FiscalYear.findOne({ where: { id: fiscalYearId } });
      if (!fiscalYear) {
        return res.status(404).json({ message: "Fiscal Year not found" });
      }
  
      const debitAccount = await Account.findByPk(debitAccountId);
      const creditAccount = await Account.findByPk(creditAccountId);
  
      if (!debitAccount || !creditAccount) {
        return res.status(404).json({ message: 'Invalid debit or credit account' });
      }
  
      const debitAmount = invoice.totalAmount;
      const creditAmount = invoice.totalAmount;
  
      const journal = await Journal.create({
        date: new Date(),
        description: `تحصيل فاتورة رقم ${invoice.id}`,
        fiscalYearId: fiscalYear.id,
      });
  
      await JournalEntry.create({
        journalId: journal.id,
        accountId: debitAccount.id,
        description: `تحصيل فاتورة رقم ${invoice.id}`,
        debit: debitAmount,
        credit: 0,
        amount: debitAmount,
        date: new Date()
      });

      await JournalEntry.create({
        journalId: journal.id,
        accountId: creditAccount.id,
        description: `تحصيل فاتورة رقم ${invoice.id}`,
        debit: 0,
        credit: creditAmount,
        amount: creditAmount,
        date: new Date()
      });

  
      return res.status(200).json({
        message: 'Invoice collected and journal entry recorded successfully',
        invoice,
        payment,
        journal,
        
      });
  
    } catch (error) {
      return res.status(500).json({
        message: 'Error collecting invoice',
        error: error.message
      });
    }
  }

  static async returnInvoice(req, res) {
    const { invoiceId, fiscalYearId, debitAccountId, creditAccountId } = req.body;

    try {
      const invoice = await Invoice.findByPk(invoiceId);
      if (!invoice || invoice.status !== 'paid') {
        return res.status(400).json({ message: 'Invoice not found or not paid' });
      }

      const fiscalYear = await FiscalYear.findByPk(fiscalYearId);
      if (!fiscalYear) {
        return res.status(404).json({ message: 'Fiscal year not found' });
      }

      const debitAccount = await Account.findByPk(debitAccountId);
      const creditAccount = await Account.findByPk(creditAccountId);
      if (!debitAccount || !creditAccount) {
        return res.status(404).json({ message: 'Invalid debit or credit account' });
      }

      const amount = invoice.totalAmount;

      const returnInvoice = await Invoice.create({
        customerName: invoice.customerName,
        date: new Date(),
        totalAmount: -amount,
        invoiceType: invoice.invoiceType,
        status: 'returned',
        notes: `مرتجع للفاتورة رقم ${invoice.id}`
      });

      const journal = await Journal.create({
        date: new Date(),
        description: `مرتجع للفاتورة رقم ${invoice.id}`,
        fiscalYearId: fiscalYear.id,
      });

      await JournalEntry.create({
        date: new Date(),
        journalId: journal.id,
        accountId: debitAccount.id,
        description: `إلغاء تحصيل الفاتورة ${invoice.id}`,
        debit: amount,
        credit: 0,
        amount
      });

      await JournalEntry.create({
        date: new Date(),
        journalId: journal.id,
        accountId: creditAccount.id,
        description: `إلغاء تحصيل الفاتورة ${invoice.id}`,
        debit: 0,
        credit: amount,
        amount
      });

      invoice.status = 'refunded';
      await invoice.save();

      return res.status(200).json({
        message: 'Invoice returned and reversal journal entry recorded successfully',
        originalInvoice: invoice,
        returnInvoice,
        journal,
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error returning invoice',
        error: error.message
      });
    }
  }


  static async updateInvoiceStatus(req, res) {
    const { invoiceId, status } = req.body;

    try {
      const invoice = await Invoice.findOne({ where: { id: invoiceId } });
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      // تحديث حالة الفاتورة
      await invoice.update({ status });

      return res.status(200).json({
        message: 'Invoice status updated successfully',
        invoice,
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error updating invoice status',
        error: error.message,
      });
    }
  }

  static async cancelInvoice(req, res) {
    const { invoiceId } = req.body;

    try {
      const invoice = await Invoice.findOne({ where: { id: invoiceId } });
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      await invoice.update({ status: 'cancelled' });

      return res.status(200).json({
        message: 'Invoice cancelled successfully',
        invoice,
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error cancelling invoice',
        error: error.message,
      });
    }
  }
  
}

module.exports = InvoiceController;