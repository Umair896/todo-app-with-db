const sequelize = require("../../utils/db-connection");
const { DataTypes } = require("sequelize");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15],
      },
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "NA",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Todo;
