module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define("info", {
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    sectors: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      allowNULL: false,
    },
  });

  return Info;
};
