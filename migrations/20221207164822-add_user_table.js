"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "company", key: "id" },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
