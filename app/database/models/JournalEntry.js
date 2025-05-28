const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const CostCenter = require('./CostCenter');
const Account = require('./Account');
const Journal = require('./Journal');

const JournalEntry = sequelize.define('JournalEntry', {
  journalId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'journals',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  accountId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'accounts',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  costCenterId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'cost_centers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  debit: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  credit: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
}, {
    timestamps: true,
    tableName: 'journal_entry', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

JournalEntry.associate = function(models) {
  JournalEntry.belongsTo(models.Journal, { as: 'journalEntries', foreignKey: 'journalId' });
  JournalEntry.belongsTo(models.Account, { as: 'account', foreignKey: 'accountId' });
  JournalEntry.belongsTo(models.CostCenter, { as: "costCenter", foreignKey: 'costCenterId' });
}

module.exports = JournalEntry;
