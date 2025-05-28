const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account')

const Branch = sequelize.define('Branch', {
   name: {
    type: DataTypes.STRING,
   },
    code: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    tableName: 'branches', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 

Branch.associate = function(models) {
  Branch.hasMany(models.Account, { foreignKey: 'branchId' });
};

module.exports = Branch;
