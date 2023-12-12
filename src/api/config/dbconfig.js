module.exports = {
  HOST: process.env.REACT_APP_SERVER_URL || "sql12.freesqldatabase.com",
  USER: process.env.REACT_APP_MYSQL_USER || "sql12669442",
  PASSWORD: process.env.REACT_APP_MYSQL_PW || "x9WXCRQ2ic",
  DB: process.env.REACT_APP_MYSQL_USER || "sql12669442",
  dialect: "mysql",
  PORT: "3306",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

