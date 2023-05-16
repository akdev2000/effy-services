"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.bulkInsert("company", [
      {
        name: "New Consultancy Services",
        address:
          "Noombal Road, Ambattur, Thiruvallur District, Tamil Nadu, 600077, India",
      },
      {
        name: "Aramco",
        address:
          "77, Crescent Avenue, Jersey City, Hudson County, New Jersey, 07304, United States",
      },
      {
        name: "Turing",
        address:
          "137, Fells Road, Essex Fells, Essex County, New Jersey, 07021, United States",
      },
      {
        name: "Mercedes Benz",
        address:
          "Van Beuren Road, Harding Township, Morris County, New Jersey, 07976, United States",
      },
      {
        name: "Tata Motors",
        address:
          "Village of Oyster Bay Cove, Town of Oyster Bay, Nassau County, New York, 11732, United States",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.bulkDelete(
      "company",
      {
        name: {
          [Op.in]: [
            "New Consultancy Services",
            "Aramco",
            "Turing",
            "Mercedes Benz",
            "Tata Motors",
          ],
        },
      }
      // [
      //   {
      //     name: "New Consultancy Services",
      //     address:
      //       "Noombal Road, Ambattur, Thiruvallur District, Tamil Nadu, 600077, India",
      //   },
      //   {
      //     name: "Aramco",
      //     address:
      //       "77, Crescent Avenue, Jersey City, Hudson County, New Jersey, 07304, United States",
      //   },
      //   {
      //     name: "Turing",
      //     address:
      //       "137, Fells Road, Essex Fells, Essex County, New Jersey, 07021, United States",
      //   },
      //   {
      //     name: "Mercedes Benz",
      //     address:
      //       "Van Beuren Road, Harding Township, Morris County, New Jersey, 07976, United States",
      //   },
      //   {
      //     name: "Tata Motors",
      //     address:
      //       "Village of Oyster Bay Cove, Town of Oyster Bay, Nassau County, New York, 11732, United States",
      //   },
      // ]
    );
  },
};
