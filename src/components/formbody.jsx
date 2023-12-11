import MultiLevelMenu from "./MultiLevelMenu";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import SingleLevelMenu from "./SingleLevelMenu";
import "../App.scss";

const FormBody = function () {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateDetect, setUpdateDetect] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sectors: "",
    agreement: false,
  });
  const [loading, setLoading] = useState(true);

  const handleError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      agreement: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeSnackbar();
    if (!formData?.name || formData?.name?.length === 0) {
      handleError("Please enter the name!");
      return;
    } else if (!formData?.sectors || formData?.sectors?.length === 0) {
      handleError("Please enter the sector!");
      return;
    } else if (!formData?.agreement || formData?.agreement === false) {
      handleError("Please check the agreement!");
      return;
    }
    if (!update) {
      try {
        const { data } = await axios.post(
          `https://my-task-bishalkc.onrender.com/api/info/addInformation`,
          {
            name: formData?.name,
            sectors: formData?.sectors,
            agreement: formData?.agreement,
          }
        );
        sessionStorage.setItem("myData", JSON.stringify(data?.infos));
        setSuccess(true);
        setUpdateDetect(true);
      } catch (e) {
        console.log("error", e.message);
      }
    } else if (update) {
      try {
        const id = formData?.id;
        const { data } = await axios.put(
          `https://my-task-bishalkc.onrender.com/api/info/${id}`,
          {
            name: formData?.name,
            sectors: formData?.sectors,
            agreement: formData?.agreement,
          }
        );
        setSuccess(true);
        setUpdate(false);
        console.log(data);
        sessionStorage.setItem("myData", JSON.stringify(formData));
      } catch (e) {
        console.log("error", e.message);
      }
    }
  };

  const handleLogoutSession = () => {
    sessionStorage.removeItem("myData");
    setSuccess(false);
    setUpdate(false);
    setFormData({});
  };

  useEffect(() => {
    const storedValue = sessionStorage.getItem("myData");
    if (storedValue) {
      setSuccess(true);
    }
  }, []);

  useEffect(() => {
    const storedValue = sessionStorage.getItem("myData");
    if (storedValue) {
      const parsedData = JSON.parse(storedValue);
      setFormData({
        id: parsedData?.id,
        name: parsedData?.name,
        sectors: parsedData?.sectors,
        agreement: parsedData?.agreement,
      });
    }
  }, [update, updateDetect]);

  return (
    <div className="grid h-screen w-full">
      <div className="bg-gray-100 flex flex-col justify-center backgroundImg">
        {!success ? (
          <form
            className="max-w-[400px] w-full mx-auto taskContainer p-4 rounded-[12px]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-center py-4">Task</h1>
            <p>
              Please enter your name and pick the Sectors you are currently
              involved in.{" "}
            </p>

            <div className="flex flex-col py-2">
              <label className="text-start">
                Name <label className="text-red-700">*</label>
              </label>
              <input
                className="border-b-2 border-black p-2 bg-transparent hover:border-b-2 transition-colors duration-300 hover:border-yellow-400 outline-none"
                type="text"
                name="name"
                autoComplete="off"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col py-2 bg-transparent">
              <label className="text-start">
                Sectors <label className="text-red-700">*</label>
              </label>
              {isMobile ? (
                <SingleLevelMenu
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  setLoading={setLoading}
                ></SingleLevelMenu>
              ) : (
                <MultiLevelMenu
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
            </div>
            <div className="py-2 text-start">
              <label>
                <input
                  className="border p-2 me-2"
                  type="checkbox"
                  id="myCheckbox"
                  name="agreement"
                  checked={formData.agreement}
                  value={formData.agreement}
                  onChange={handleInputChange}
                />
                Agree to the terms
              </label>
            </div>
            <button className="w-full my-5 py-2 text-black text-bold bg-gray-100 hover:bg-gray-500 rounded-[18px]">
              {update ? "Update" : "Save"}
            </button>
          </form>
        ) : (
          <div className="max-w-[400px] w-full mx-auto taskContainer bg-transparent p-4 rounded-[12px]">
            <div className="flex flex-col justify-center ">
              <FaCheckCircle
                size={"40px"}
                color="green"
                className="flex text-center mx-auto"
              />
              <label className="text-center text-xl mt-1">
                Successfully saved!
              </label>
              <table className="min-w-full divide-y divide-black my-8">
                <thead className="bg-transparent">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-black font-extrabold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-black font-extrabold uppercase tracking-wider">
                      Sector
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-black">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-start">
                      {formData?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-start">
                      {formData?.sectors}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="w-full py-2 text-black text-bold bg-gray-100 hover:bg-gray-500 rounded-[18px]"
                onClick={() => {
                  setSuccess(false);
                  setUpdate(true);
                }}
              >
                Update
              </button>
              <button
                className="w-full my-3 py-2 text-black text-bold bg-gray-100 hover:bg-gray-500 rounded-[18px]"
                onClick={handleLogoutSession}
              >
                Logout Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBody;
