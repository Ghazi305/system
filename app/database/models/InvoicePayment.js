const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Invoice = require('./Invoice');
const Payment = require('./Payment');

const InvoicePayment = sequelize.define('InvoicePayment', {
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
  paymentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'payments',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'invoice_payments',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

InvoicePayment.associate = function(models) {
  InvoicePayment.belongsTo(models.Invoice, { as: 'invoice', foreignKey: 'invoiceId' });
  InvoicePayment.belongsTo(models.Payment, { as: 'payment', foreignKey: 'paymentId' });
};

module.exports = InvoicePayment;