import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

function ModalAddCities({ isOpen, onClose, onSubmit, editCity }) {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCityName("");
    } else if (editCity) {
      setCityName(editCity.name);
    }
  }, [isOpen, editCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cityName, editCity?.id);
    setCityName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] relative overflow-hidden">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold mt-2">
          {editCity ? "Edit City" : "Add City"}
        </h3>

        <form onSubmit={handleSubmit} className="h-full">
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

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
              onClick={onClose}
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
