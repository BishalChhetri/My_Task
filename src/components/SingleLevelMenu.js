import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { convertDatasets } from "../convertDatasets.js";

const SingleLevelMenu = ({ setFormData, formData }) => {
  const [store, setStore] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [menuItems, setMenuItems] = useState({});

  const handleClick = (title) => {
    setStore(store.push(title?.value));
    setFormData({ ...formData, sectors: store[0] });
  };

  const fetchMenuItems = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/sector/getAllSector`
    );
    setMenuItems(convertDatasets(data));
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const flattenMenu = (menuItems, parentTitle = "") => {
    let result = [];

    menuItems?.forEach((item) => {
      const { title, submenu } = item;

      if (submenu && submenu.length > 0) {
        const subMenuTitles = flattenMenu(submenu, title);
        result = result.concat(subMenuTitles);
      } else {
        result.push({
          value: title,
          label: title,
        });
      }
    });

    return result;
  };

  useEffect(() => {
    if (menuItem.length === 0 && menuItems.length > 0) {
      const flattenedMenu = flattenMenu(menuItems);
      setMenuItem(flattenedMenu);
    }
  }, [menuItems]);

  useEffect(() => {
    if (Number.isInteger(store)) {
      setStore([]);
    }
    setDefaultValue({ value: formData?.sectors, label: formData?.sectors });
  }, [store, formData]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 150,
      overflowY: "auto",
    }),
  };

  return (
    <div className="flex justify-center">
      <Select
        options={menuItem}
        styles={customStyles}
        placeholder="Sectors"
        isSearchable={true}
        onChange={handleClick}
        value={defaultValue || null}
      />
    </div>
  );
};

export default SingleLevelMenu;
