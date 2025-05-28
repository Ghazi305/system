'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('journal_entry', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     journalId: {
         type: Sequelize.INTEGER,
         references: {
           model: 'journals',
           key: 'id'
         },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE',
         allowNull: false
       },
       accountId: {
         type: Sequelize.INTEGER,
         references: {
           model: 'accounts',
           key: 'id'
         },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE',
         allowNull: false
       },
       description: {
         type: Sequelize.STRING,
         allowNull: false
       },
       debit: {
         type: Sequelize.FLOAT,
         allowNull: false
       },
       credit: {
         type: Sequelize.FLOAT,
         allowNull: false
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('journal_entry');
  }
};