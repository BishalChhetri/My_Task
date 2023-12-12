export const convertDatasets = (data) => {
  const menuItems = [];

  data.forEach((item) => {
    const {
      menuitems_title,
      submenus_title,
      submenusubs_title,
      submenusubchild_title,
    } = item;

    // Find or create the menu item
    let menuItem = menuItems.find((menu) => menu.title === menuitems_title);
    if (!menuItem) {
      menuItem = { title: menuitems_title, submenu: [] };
      menuItems.push(menuItem);
    }

    // Find or create the sub-menu item
    let subMenuItem = menuItem.submenu.find(
      (submenu) => submenu.title === submenus_title
    );
    if (!subMenuItem && submenus_title) {
      subMenuItem = { title: submenus_title, submenu: [] };
      menuItem.submenu.push(subMenuItem);
    }

    // Find or create the sub-sub-menu item
    let subSubMenuItem = subMenuItem?.submenu.find(
      (subsubmenu) => subsubmenu.title === submenusubs_title
    );
    if (!subSubMenuItem && submenusubs_title) {
      subSubMenuItem = { title: submenusubs_title, submenu: [] };
      subMenuItem.submenu.push(subSubMenuItem);
    }

    // Find or create the sub-sub-sub-menu item
    let subSubSubMenuItem = subSubMenuItem?.submenu.find(
      (subsubsubmenu) => subsubsubmenu.title === submenusubchild_title
    );
    if (!subSubSubMenuItem && submenusubchild_title) {
      subSubSubMenuItem = { title: submenusubchild_title };
      subSubMenuItem.submenu.push(subSubSubMenuItem);
    }
  });

  return menuItems;
};
