module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define("menuitem", {
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
  });

  return MenuItem;
};
