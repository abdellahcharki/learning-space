const { Sequelize } = require('sequelize');
require("dotenv").config();

const env = process.env;




  module.exports = new Sequelize({
    host: env.HOST,
    dialect:  env.DIALECT,
    username: "root",
    database: "lerneform"
  }
);