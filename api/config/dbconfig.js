module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.REACT_APP_MYSQL_PW,
  DB: "task_new",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
