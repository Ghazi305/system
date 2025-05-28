const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const OTPCode = sequelize.define('OTPCode', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expires_at: {
    type: Sequelize.DATE
  },
}, {
    timestamps: true,
    tableName: 'otp_codes', 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}); 


module.exports = OTPCode;