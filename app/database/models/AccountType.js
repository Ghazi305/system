const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account'); 


const AccountType = sequelize.define('AccountType', {
  code: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('Revenue', 'Expense', 'Equity', 'Liabilities', 'Assets'),
    allowNull: false,
  }
}, {
    timestamps: true,
    tableName: 'account_types', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

AccountType.associate = function(models) {
  AccountType.hasMany(models.Account, { as: "accounts", foreignKey: 'accountTypeId' });
};

module.exports = AccountType;