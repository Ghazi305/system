const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const JournalEntry = require('./JournalEntry')

const CostCenter = sequelize.define('CostCenter', {
   name: {
    type: DataTypes.STRING,
   },
    code: {
      type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'cost_centers', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

CostCenter.associate = function(models) {
  CostCenter.hasMany(models.JournalEntry, { as: "journalEntries", foreignKey: 'costCenterId' });
};

module.exports = CostCenter;