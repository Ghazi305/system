const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Journal = sequelize.define('Journal', {
  date: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.STRING
  },
  fiscalYearId: {
    type: DataTypes.INTEGER
  }
}, {
    timestamps: true,
    tableName: 'journals', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

Journal.associate = function(models) {
   Journal.hasMany(models.JournalEntry, { as: "journals", foreignKey: 'journalId' });
   Journal.belongsTo(models.FiscalYear, { foreignKey: 'fiscalYearId' });
}

module.exports = Journal;
