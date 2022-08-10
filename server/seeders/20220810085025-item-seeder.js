const { faker } = require('@faker-js/faker');
const { uuid } = require('uuidv4');
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
     let dummyJSONItems = [];
     for(let i = 1 ; i <= 10 ; i++){
      dummyJSONItems.push({
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
      image: faker.image.image(),
      userId: i,
      createdAt : new Date(),
      updatedAt : new Date()
        });
     }
     await queryInterface.bulkInsert('items',dummyJSONItems,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('items', null, {});
  }
};
