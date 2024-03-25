'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OutpassRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PlaceToBeVisited: {
        type: Sequelize.STRING
      },
      PurposeOfVisit: {
        type: Sequelize.STRING
      },
      datetimeout: {
        type: Sequelize.DATE
      },
      datetimein: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      qrimage: {
        type: Sequelize.BLOB
      },
      userid: {
        type: Sequelize.INTEGER
      },
      scannedstatus: {
        type: Sequelize.BOOLEAN
      },
      issuedby: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('OutpassRequests');
  }
};