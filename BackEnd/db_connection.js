const { Sequelize, DataTypes } = require("sequelize");

let sequelize = new Sequelize(
  "exchange_currency_db", //db name
  "root", //server name
  "root", //server pass
  {
    define: { freezeTableName: true, timestamps: false },
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate(); // check if connected (bya3moul SELECT 1 + 1 to ensure connection)
} catch (error) {
  console.log(error.toString());
}

module.exports = {
  sequelize,
  DataTypes,
};
