'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      taxAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      invoiceType: { 
        type: Sequelize.ENUM('hajj', 'umrah', 'education'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'returned', 'cancelled', 'under_review'),
        allowNull: false,
        defaultValue: 'pending'
      },
      issuedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      processedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoices');
  }
};