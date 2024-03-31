const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("es2", "root", "password", {
  host: "database",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
    throw new Error("Unable to connect to the database");
  });

module.exports = sequelize;
