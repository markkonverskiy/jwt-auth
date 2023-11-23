const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Token = sequelize.define("token", {
  user: { type: DataTypes.STRING, ref: "User" },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  User,
  Token,
};
