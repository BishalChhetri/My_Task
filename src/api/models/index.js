const dbConfig = require("../config/dbconfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected....");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.infos = require("./info.js")(sequelize, DataTypes);
db.menuitems = require("./menuItem.js")(sequelize, DataTypes);
db.submenus = require("./subMenu.js")(sequelize, DataTypes);
db.submenusubs = require("./subMenuSub.js")(sequelize, DataTypes);
db.submenusubchild = require("./subMenuSubChild.js")(sequelize, DataTypes);

// Not create the table if already exist in database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync done!");
});

module.exports = db;
