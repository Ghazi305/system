const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const AccountType = require('./accounttype');
const AccountGroup = require('./AccountGroup'); 
const Currency = require('./Currency'); 
const JournalEntry = require('./JournalEntry'); 

const Account = sequelize.define('Account', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'accounts',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  accountTypeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'account_types',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  groupId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'account_groups',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  currencyId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'currencies',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  },
  branchId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'branches',
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
}, {
    timestamps: true,
    tableName: 'accounts', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

Account.associate = function(models) {
  Account.belongsTo(models.AccountType, { as: "accountType", foreignKey: 'accountTypeId' });
  Account.belongsTo(models.AccountGroup, { as: "group", foreignKey: 'groupId' });
  Account.belongsTo(models.Account, { as: 'parent', foreignKey: 'parentId' });

  Account.hasMany(models.Account, { as: 'children', foreignKey: 'parentId' });
  Account.hasMany(models.JournalEntry, { as: 'account', foreignKey: 'accountId' });
  Account.hasMany(models.OpeningBalance, { foreignKey: 'accountId' });
  Account.belongsTo(models.Currency, { as: "currency", foreignKey: 'currencyId' });
};

module.exports = Account;