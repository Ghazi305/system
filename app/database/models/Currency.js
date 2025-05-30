const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account');

const Currency = sequelize.define('Currency', {
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: false
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
