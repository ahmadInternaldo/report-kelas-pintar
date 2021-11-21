'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require('../data.json');
    await queryInterface.bulkInsert('users', data.users, {});
    await queryInterface.bulkInsert('subjects', data.subjects, {});
    await queryInterface.bulkInsert('chapters', data.chapters, {});
    await queryInterface.bulkInsert('reports', data.reports, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
    await queryInterface.bulkDelete('chapters', null, {});
    await queryInterface.bulkDelete('reports', null, {});
  }
};
