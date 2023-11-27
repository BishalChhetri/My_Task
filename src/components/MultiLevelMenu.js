import React from "react";
import Dropdown from "react-multilevel-dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { convertDatasets } from "../convertDatasets.js";

const MultiLevelMenu = ({ setFormData, formData }) => {
  const [store, setStore] = useState([]);
  const [title, setTitle] = useState("Sectors");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuItems, setMenuItems] = useState({});

  const handleClick = (title) => {
    setStore(store.push(title));
    setTitle(store[0]);
    setFormData({ ...formData, sectors: store[0] });
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (Number.isInteger(store)) {
      setStore([]);
    }
    setTitle(formData?.sectors || "Sectors");
  }, [store, formData]);

  const fetchMenuItems = async () => {
    const { data } = await axios.get(
      `https://my-task-bishalkc.onrender.com/api/sector/getAllSector`
    );
    setMenuItems(convertDatasets(data));
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const renderSubMenu = (submenu) => {
    if (!submenu || submenu.length === 0) {
      return null;
    }

    return (
      <Dropdown.Submenu position="right">
        {submenu?.map((subItem) => (
          <Dropdown.Item
            key={subItem.title}
            onClick={() => {
              handleClick(subItem.title);
            }}
          >
            {subItem.title}
            {renderSubMenu(subItem.submenu)}
          </Dropdown.Item>
        ))}
      </Dropdown.Submenu>
    );
  };

  const renderMenu = (items) => {
    return items?.map((item) => (
      <Dropdown.Item
        key={item.title}
        position="right"
        onClick={() => handleClick(item.title)}
      >
        {item.title}
        {renderSubMenu(item.submenu)}
      </Dropdown.Item>
    ));
  };

  return (
    <div>
      {menuItems.length > 0 && (
        <Dropdown
          title={title}
          position="top-right"
          buttonVariant="special-success"
          isDisabled={dropdownOpen}
        >
          {renderMenu(menuItems)}
        </Dropdown>
      )}
    </div>
  );
};

export default MultiLevelMenu;
