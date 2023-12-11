import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { convertDatasets } from "../convertDatasets.js";
import { ColorRing } from "react-loader-spinner";

const SingleLevelMenu = ({ setFormData, formData, loading, setLoading }) => {
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
      `https://my-task-bishalkc.onrender.com/api/sector/getAllSector`
    );
    setMenuItems(convertDatasets(data));
    setLoading(false);
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
      {loading ? (
        <div className="max-w-[400px] w-full mx-auto bg-white p-4 bg-transparent">
          <div className="flex justify-center text-center mx-auto">
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
        <Select
          options={menuItem}
          styles={customStyles}
          placeholder="Sectors"
          isSearchable={true}
          className="text-black border border-black rounded-[5px] hover:border-black"
          onChange={handleClick}
          value={defaultValue || null}
        />
      )}
    </div>
  );
};

export default SingleLevelMenu;
