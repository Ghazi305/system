const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account');

const Currency = sequelize.define('Currency', {
   name: {
    type: DataTypes.STRING,
   },
    code: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'currencies', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

Currency.associate = function(models) {
  Currency.hasMany(models.Account, { as: "currency", foreignKey: 'currencyId' });
};

module.exports = Currency;
