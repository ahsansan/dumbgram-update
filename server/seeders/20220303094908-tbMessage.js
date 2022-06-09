"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "tbMessages",
      [
        {
          idSender: 1,
          idReceiver: 2,
          message: "Halo san",
          createdAt: "2022-02-16 07:17:46",
          updatedAt: "2022-02-19 20:46:34",
        },
        {
          idSender: 2,
          idReceiver: 1,
          message: "Halo bang",
          createdAt: "2022-02-16 08:17:46",
          updatedAt: "2022-02-19 21:46:34",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
