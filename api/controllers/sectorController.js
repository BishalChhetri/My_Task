const db = require("../models");
const { sequelize } = require("../models");

// const MenuItem = db.menuitems;
// const SubMenu = db.submenus;
// const SubMenuSub = db.submenusubs;
// const SubMenuSubChild = db.submenusubchild;

// Get All Info
const getAllSector = async (req, res) => {
  try {
    const results = await sequelize.query(
      "SELECT mi.title AS menuitems_title, sm.title AS submenus_title, ss.title AS submenusubs_title, ssc.title AS submenusubchild_title FROM menuitems mi LEFT JOIN submenus sm ON mi.title = sm.menuItem_title LEFT JOIN submenusubs ss ON sm.title = ss.subMenu_title LEFT JOIN submenusubchild ssc ON ss.title = ssc.subMenuSub_title",
      { type: db.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).send(JSON.parse(JSON.stringify(results)));
  } catch (e) {
    console.log(e.mesage);
  }
};

module.exports = { getAllSector };
