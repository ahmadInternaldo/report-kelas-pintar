'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      createdDate: {
        type: Sequelize.DATE,
      },
      modifiedBy: {
        type: Sequelize.STRING,
      },
      modifiedDate: {
        type: Sequelize.DATE,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tokenSession: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('subjects', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      createdDate: {
        type: Sequelize.DATE,
      },
      modifiedBy: {
        type: Sequelize.STRING,
      },
      modifiedDate: {
        type: Sequelize.DATE,
      },
      subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });

    await queryInterface.createTable('chapters', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      createdDate: {
        type: Sequelize.DATE,
      },
      modifiedBy: {
        type: Sequelize.STRING,
      },
      modifiedDate: {
        type: Sequelize.DATE,
      },
      chapterName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.STRING,
        references: {
          model: 'subjects',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.createTable('reports', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      createdDate: {
        type: Sequelize.DATE,
      },
      modifiedBy: {
        type: Sequelize.STRING,
      },
      modifiedDate: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      subjectId: {
        type: Sequelize.STRING,
        references: {
          model: 'subjects',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      chapterId: {
        type: Sequelize.STRING,
        references: {
          model: 'chapters',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      grade: {
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('subjects');
    await queryInterface.dropTable('chapters');
    await queryInterface.dropTable('reports');
  },
};
