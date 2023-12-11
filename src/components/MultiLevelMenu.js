import React from "react";
import Dropdown from "react-multilevel-dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { convertDatasets } from "../convertDatasets.js";
import { ColorRing } from "react-loader-spinner";

const MultiLevelMenu = ({ setFormData, formData, loading, setLoading }) => {
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
    setLoading(false);
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
    <div className="bg-transparent">
      {loading ? (
        <div className="max-w-[400px] w-full mx-auto p-4 bg-transparent">
          <div className="flex justify-center text-center mx-auto bg-transparent">
            <label></label>
            <ColorRing
              visible={true}
              height="35"
              width="35"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </div>
      ) : (
        <div>
          {menuItems.length > 0 && (
            <Dropdown
              title={title}
              position="top-right"
              buttonVariant="special"
              className="text-black border border-black px-3 py-2 rounded-[5px]"
              isDisabled={dropdownOpen}
            >
              {renderMenu(menuItems)}
            </Dropdown>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiLevelMenu;
