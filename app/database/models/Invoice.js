const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Payment = require('./Payment')

const Invoice = sequelize.define('Invoice', {
  customerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  totalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  taxAmount: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  invoiceType: { 
    type: Sequelize.ENUM('hajj', 'umrah', 'education'),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('pending', 'paid', 'cancelled', 'under_review'),
    allowNull: false,
    defaultValue: 'pending'
  },
  issuedBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  processedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
}, {
    timestamps: true,
    tableName: 'invoices', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

Invoice.associate = function(models) {
  Invoice.hasMany(models.InvoicePayment, { as: "paymentMethods", foreignKey: 'invoiceId' });

  Invoice.hasMany(models.Payment, { as: "payment", foreignKey: 'invoiceId' });
  Invoice.hasMany(models.InvoiceItem, { as: "item", foreignKey: 'invoiceId' });
};

module.exports = Invoice;