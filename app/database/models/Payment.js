const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account')

const Payment = sequelize.define('Payment', {
  invoiceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'invoices',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  method: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reference: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
    timestamps: true,
    tableName: 'payments', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

Payment.associate = function(models) {
  Payment.belongsTo(models.Invoice, { foreignKey: 'invoiceId', as: 'invoice' });

  
  Payment.hasMany(models.InvoicePayment, { foreignKey: 'paymentId', as: 'invoicePayments' });
};

module.exports = Payment;