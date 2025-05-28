const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account'); 

const AccountGroup = sequelize.define('AccountGroup', {
  code: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
    timestamps: true,
    tableName: 'account_groups', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

AccountGroup.associate = function(models) {
  AccountGroup.hasMany(models.Account, { as: "accountType", foreignKey: 'groupId' });
};

module.exports = AccountGroup;
