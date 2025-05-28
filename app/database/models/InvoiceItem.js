const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Invoice = require('./Invoice')

const InvoiceItem = sequelize.define('InvoiceItem', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  },
}, {
    timestamps: true,
    tableName: 'invoice_items', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

InvoiceItem.associate = function(models) {
  InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
};

module.exports = InvoiceItem;
