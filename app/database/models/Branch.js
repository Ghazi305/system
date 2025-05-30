const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account')

const Branch = sequelize.define('Branch', {
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
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
