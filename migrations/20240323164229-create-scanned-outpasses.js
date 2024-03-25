'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScannedOutpasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OutpassId: {
        type: Sequelize.INTEGER
      },
      Outtime: {
        type: Sequelize.DATE
      },
      intime: {
        type: Sequelize.DATE
      },
      checkout: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    defaultValue: false
      },
      checkIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    defaultValue: false
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
    await queryInterface.dropTable('ScannedOutpasses');
  }
};