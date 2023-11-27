module.exports = (sequelize, DataTypes) => {
  const SubMenuSub = sequelize.define("submenusub", {
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    subMenu_title: {
      type: DataTypes.STRING,
      allowNULL: false,
      references: {
        model: "submenu",
        key: "title",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
  });

  return SubMenuSub;
};
