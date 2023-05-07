const { sequelize, DataTypes } = require("../db_connection");

const User = sequelize.define("user", {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Username: DataTypes.STRING,
  Password: DataTypes.STRING,
});

const Balance = sequelize.define("balance", {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
  },
  CurrencyID: DataTypes.INTEGER,
  Balance: DataTypes.FLOAT,
});

const Currency = sequelize.define("currency", {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Balance, {
  //we have a user and we want to include its balances
  sourceKey: "ID",
  foreignKey: "UserID",
  as: "Balance",
});

Balance.hasOne(Currency, {
  //we have a Balance and we want to include its Currency name
  sourceKey: "CurrencyID",
  foreignKey: "ID",
  as: "Currency",
});

module.exports = {
  User,
  Balance,
  Currency,
};
