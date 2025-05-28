const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const fiscalYear = require('./fiscalYear');


const OpeningBalance = sequelize.define('OpeningBalance', {
   accountId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  fiscalYearId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'fiscal_years',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  debit: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  credit: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
}, {
    timestamps: true,
    tableName: 'opening_balances', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

OpeningBalance.associate = function(models) {
  OpeningBalance.belongsTo(models.FiscalYear, { foreignKey: 'fiscalYearId' });
  OpeningBalance.belongsTo(models.Account, { as: 'account', foreignKey: 'accountId' });
};

module.exports = OpeningBalance;