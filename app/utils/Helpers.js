const { Invoice, Account, AccountGroup, AccountType, Payment } = require('../database/models');

class Helpers {
  static async generateUniqueInvoiceNumber() {
    try {
        const lastAccount = await Invoice.findOne({
        order: [['invoiceNumber', 'DESC']]
        });


        const lastNumberStr = lastAccount && lastAccount.invoiceNumber ? lastAccount.invoiceNumber.split('-')[1] : null;
        const lastNumber = lastNumberStr && !isNaN(parseInt(lastNumberStr, 10)) ? parseInt(lastNumberStr, 10) : 0;
        const nextNumber = lastNumber + 1;

        return `ACC-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating invoice number:', error);
        throw new Error('Unable to generate invoce number');
    }
  }

 static async generateUniqueAccountNumber() {
  try {
    const lastAccount = await Account.findOne({
      order: [['code', 'DESC']]
    });

    console.log('Last account code:', lastAccount ? lastAccount.code : 'No last account');

    const lastNumberStr = lastAccount && lastAccount.code ? lastAccount.code.split('-')[1] : null;
    const lastNumber = lastNumberStr && !isNaN(parseInt(lastNumberStr, 10)) ? parseInt(lastNumberStr, 10) : 0;
    const nextNumber = lastNumber + 1;

        return `ACC-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating account code:', error);
        throw new Error('Unable to generate account code');
    }
  }

  static async generateUniqueAccountTypeNumber() {
    try {
    const lastAccount = await AccountType.findOne({
      order: [['code', 'DESC']]
    });

    console.log('Last account code:', lastAccount ? lastAccount.code : 'No last account');

    const lastNumberStr = lastAccount && lastAccount.code ? lastAccount.code.split('-')[1] : null;
    const lastNumber = lastNumberStr && !isNaN(parseInt(lastNumberStr, 10)) ? parseInt(lastNumberStr, 10) : 0;
    const nextNumber = lastNumber + 1;

        return `ACT-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating account code:', error);
        throw new Error('Unable to generate account code');
    }
  }

  static async generateUniqueAccountGroupNumber() {
    try {
    const lastAccount = await AccountGroup.findOne({
      order: [['code', 'DESC']]
    });


    const lastNumberStr = lastAccount && lastAccount.code ? lastAccount.code.split('-')[1] : null;
    const lastNumber = lastNumberStr && !isNaN(parseInt(lastNumberStr, 10)) ? parseInt(lastNumberStr, 10) : 0;
    const nextNumber = lastNumber + 1;

        return `ACG-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating account code:', error);
        throw new Error('Unable to generate account code');
    }
  }

  static async generateUniqueReferenceNumber() {
    try {
    const lastAccount = await Payment.findOne({
      order: [['reference', 'DESC']]
    });

    const lastNumberStr = lastAccount && lastAccount.reference ? lastAccount.reference.split('-')[1] : null;
    const lastNumber = lastNumberStr && !isNaN(parseInt(lastNumberStr, 10)) ? parseInt(lastNumberStr, 10) : 0;
    const nextNumber = lastNumber + 1;

        return `REF-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generating reference code:', error);
        throw new Error('Unable to generate reference code');
    }
  }
}

module.exports = Helpers;