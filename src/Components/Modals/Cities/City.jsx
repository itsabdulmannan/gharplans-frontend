import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

function ModalAddCities({ show, close, handleSave, settingData }) {
  const [cityName, setCityName] = useState(
    settingData ? settingData.cityName : ""
  ); // State for the city name

  // Reset city name when the modal is closed
  useEffect(() => {
    if (!show) {
      setCityName(settingData ? settingData.cityName : ""); // Reset to initial city name when modal is closed
    }
  }, [show, settingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(cityName); // Pass the city name to the save function
    close();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] relative overflow-hidden">
      {/* Close Button */}
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-black" onClick={close}>
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold mt-2">Add City</h3>

        <form onSubmit={handleSubmit} className="h-full">
          {/* City Name Input */}
          <div className="mt-4">
            <label className="block">City Name</label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="w-full border px-3 py-2 mt-2 rounded-md"
              placeholder="Enter city name"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddCities;
