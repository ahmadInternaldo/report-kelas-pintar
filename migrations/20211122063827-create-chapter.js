'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      subjectId: {
        type: Sequelize.STRING,
        references: {
          model: 'Subjects',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      chapterName: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chapters');
  }
};