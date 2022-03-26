const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("access", "root", "Umair@sql123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
