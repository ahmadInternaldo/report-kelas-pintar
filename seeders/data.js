'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require('../data.json');
    await queryInterface.bulkInsert('Users', data.users, {});
    await queryInterface.bulkInsert('Subjects', data.subjects, {});
    await queryInterface.bulkInsert('Chapters', data.chapters, {});
    await queryInterface.bulkInsert('Reports', data.reports, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Subjects', null, {});
    await queryInterface.bulkDelete('Chapters', null, {});
    await queryInterface.bulkDelete('Reports', null, {});
  }
};
