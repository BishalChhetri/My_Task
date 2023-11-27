const db = require("../models");
const { sequelize } = require("../models");

// const MenuItem = db.menuitems;
// const SubMenu = db.submenus;
// const SubMenuSub = db.submenusubs;
// const SubMenuSubChild = db.submenusubchild;

// Get All Info
const getAllSectors = async (req, res) => {
  try {
    const response = await sequelize.query(
      "SELECT * FROM menuitems mi LEFT JOIN submenus sm ON mi.title = sm.menuItem_title LEFT JOIN submenusubs ss ON sm.title = ss.subMenu_title LEFT JOIN submenusubchild ssc ON ss.title = ssc.subMenuSub_title;",
      { type: db.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).send(response);
  } catch (e) {
    console.log(e.mesage);
  }
};

module.exports = { getAllSectors };
