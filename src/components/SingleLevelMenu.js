import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";

const SingleLevelMenu = ({ menuItems, setFormData, formData }) => {
  const [store, setStore] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});

  const handleClick = (title) => {
    setStore(store.push(title?.value));
    setFormData({ ...formData, sectors: store[0] });
  };

  const flattenMenu = (menuItems, parentTitle = "") => {
    let result = [];

    menuItems.forEach((item) => {
      const { title, submenu } = item;

      if (submenu) {
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
    if (menuItem.length === 0) {
      const flattenedMenu = flattenMenu(menuItems);
      setMenuItem(flattenedMenu);
    }
  }, []);

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
