module.exports = (sequelize, DataTypes) => {
  const SubMenu = sequelize.define("submenu", {
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    menuItem_title: {
      type: DataTypes.STRING,
      allowNULL: false,
      references: {
        model: "menuitem",
        key: "title",
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
  });

  return SubMenu;
};
