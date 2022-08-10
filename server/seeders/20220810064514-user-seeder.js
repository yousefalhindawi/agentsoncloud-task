const { faker } = require('@faker-js/faker');
'use strict';
// let faker = require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let dummyJSON = [];
     for(let i = 1 ; i <= 10 ; i++){
        dummyJSON.push({
          name: faker.name.firstName(),
      // last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt : new Date(),
      updatedAt : new Date()
        });
     }
     await queryInterface.bulkInsert('users',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
