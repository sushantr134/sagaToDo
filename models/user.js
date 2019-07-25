const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  verifyStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
