module.exports = {
  HOST: process.env.REACT_APP_SERVER_URL,
  USER: process.env.REACT_APP_MYSQL_USER,
  PASSWORD: process.env.REACT_APP_MYSQL_PW,
  DB: process.env.REACT_APP_MYSQL_USER,
  dialect: "mysql",
  PORT: "3306",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
