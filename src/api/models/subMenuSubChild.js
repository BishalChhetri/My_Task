module.exports = (sequelize, DataTypes) => {
  const SubMenuSubChild = sequelize.define("submenusubchild", {
    id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      autoIncrement: true,
      primaryKey: true,
    },
    subMenuSub_title: {
      type: DataTypes.STRING,
      allowNULL: false,
      references: {
        model: "submenusubs",
        key: "title",
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
  });

  return SubMenuSubChild;
};
