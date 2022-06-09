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
      "tbUsers",
      [
        {
          email: "pandji@gmail.com",
          password:
            "$2b$10$SG4aHlGRT/9omj3sonKOVOY58F8gJ3wF7BJd150AL0lQMA6SujBSe", //pandji1234
          fullName: "Pandji Pragiwaksono",
          username: "pandjipragiwaksono",
          bio: "Stand up comedy",
          image: "noname.png",
          createdAt: "2022-02-16 07:17:46",
          updatedAt: "2022-02-19 20:46:34",
        },
        {
          email: "ahsan@gmail.com",
          password:
            "$2b$10$GZUCJSuUC0qDOIvdWrM0VekKoL560PBTKZk8aE38Em9LxndVf6oRa", //ahsan1234
          fullName: "Ahsan",
          username: "ahsansan",
          bio: "Pelajar Bahasa Jepang dan JavaScript",
          image: "1642859190906-Ahsan.jpg",
          createdAt: "2022-02-16 07:17:46",
          updatedAt: "2022-02-19 20:46:34",
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
