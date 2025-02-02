import React, { useState, useEffect } from "react";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";

function AddCategoryModal({
  modalOpen,
  toggleModal,
  category,
  handleSaveCategory,
}) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null,
    status: true,
  });

  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryData({
        name: category.name,
        image: category.image,
        status: category.status,
      });
    } else {
      setCategoryData({
        name: "",
        image: null,
        status: true,
      });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleFileChange = (e) => {
    setCategoryData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formValid = true;

    setNameError("");
    setImageError("");

    if (!categoryData.name) {
      setNameError("Category name is required.");
      formValid = false;
    }

    if (!categoryData.image) {
      setImageError("Image is required.");
      formValid = false;
    }

    if (!formValid) {
      return;
    }

    handleSaveCategory(categoryData, category ? category.id : null);

    setCategoryData({
      name: "",
      image: null,
      status: true,
    });

    toggleModal();
  };

  const handleCloseModal = () => {
    setCategoryData({
      name: "",
      image: null,
      status: true,
    });
    setNameError("");
    setImageError("");
    toggleModal();
  };

  return (
    modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-12 rounded-3xl w-[600px] relative">
          <XMarkIcon
            className="m-4 absolute top-2 right-2 h-6 w-6 text-gray-600 cursor-pointer"
            onClick={handleCloseModal}
          />
          <h3 className="text-2xl font-semibold mb-4 text-center">
            {category ? "Edit Category" : "Add Category"}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full flex flex-col items-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-gray-100 p-2 border border-gray-300 rounded-md flex items-center justify-center w-5/6 mx-auto"
              >
                <CameraIcon className="h-6 w-6 text-gray-500 mr-2" />
                {categoryData.image
                  ? categoryData.image.name || "Image uploaded"
                  : "Upload Image"}
              </label>
              <input
                id="image-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageError && (
                <p className="text-red-500 text-sm mt-2">{imageError}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
                placeholder="Category Name"
                className="mt-1 block w-5/6 p-2 bg-gray-100 rounded-md mx-auto"
              />
              {nameError && (
                <p className="text-red-500 text-center text-sm mt-2">
                  {nameError}
                </p>
              )}
            </div>

            <div className="mb-4 w-full">
              <select
                name="status"
                value={categoryData.status}
                onChange={handleInputChange}
                className="mt-1 block w-5/6 p-2 bg-gray-100 rounded-md mx-auto"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div className="mb-4 w-full">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-auto mt-1 block w-5/6 p-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AddCategoryModal;
