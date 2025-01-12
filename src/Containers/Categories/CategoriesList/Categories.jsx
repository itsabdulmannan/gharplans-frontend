import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { mockCategories } from "../../../Components/Data/MockData";
import { useNavigate } from "react-router-dom";
import AddCategory from "../../../Components/Modals/Category/AddCategory";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState(mockCategories);

  const [currentCategory, setCurrentCategory] = useState(null);
  const navigate = useNavigate();
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSaveCategory = (categoryData, id = null) => {
    if (id) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, ...categoryData } : category
        )
      );
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        { ...categoryData, id: prevCategories.length + 1 },
      ]);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    toggleModal();
  };

  const handleToggleStatus = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "active" ? "inactive" : "active",
            }
          : category
      )
    );
  };

  const handleViewPage = () => {
    navigate("/category/view");
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => {
            setCurrentCategory(null);
            toggleModal();
          }}
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Sr. No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors duration-300`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={category.image ||"https://picsum.photos/200/300?grayscale"}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-3xl"
                  />
                </td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-6 py-4">
                  <div
                    className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                      category.status === "active"
                        ? "bg-primary-dark"
                        : "bg-[#cccccc]"
                    }`}
                    onClick={() => handleToggleStatus(category.id)}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                        category.status === "active" ? "translate-x-8" : ""
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={() => handleEditCategory(category)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={() => handleViewPage(category)}
                  >
                    <IoEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategory
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        category={currentCategory}
        handleSaveCategory={handleSaveCategory}
      />
    </div>
  );
}

export default Categories;
