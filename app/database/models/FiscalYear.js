const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Journal = require('./Journal');


const FiscalYear = sequelize.define('FiscalYear', {
  year: {
    type: DataTypes.STRING
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  isActive: {
    type: DataTypes.BOOLEAN
  }
}, {
    timestamps: true,
    tableName: 'fiscal_years', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

FiscalYear.associate = function(models) {
  FiscalYear.hasMany(models.Journal, { foreignKey: 'fiscalYearId' });
  FiscalYear.hasMany(models.OpeningBalance, { foreignKey: 'fiscalYearId' });
};

module.exports = FiscalYear;
