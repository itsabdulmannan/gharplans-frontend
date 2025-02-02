import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../../Components/Modals/Category/AddCategory";
import { useCategory } from "./useHook";
import Swal from "sweetalert2";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const {
    addCategory,
    editCategory,
    loading,
    getCategories,
    updateCategoryStatus,
  } = useCategory();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  const handleSaveCategory = async (categoryData, id = null) => {
    try {
      let response;

      if (id) {
        response = await editCategory(id, categoryData);
        if (response) {
          await getCategories(setCategories);
        }
      } else {
        response = await addCategory(categoryData);
        if (response) {
          await getCategories(setCategories);
        }
      }

      if (response) {
        toggleModal();
        Swal.fire("Success", "Category saved successfully!", "success");
      }
    } catch (error) {
      console.error("Error in handleSaveCategory:", error);
      Swal.fire("Error", error.message || "Failed to save category.", "error");
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    toggleModal();
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await updateCategoryStatus(id, newStatus);

      if (response) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === id ? { ...category, status: newStatus } : category
          )
        );

        Swal.fire({
          title: "Success",
          text: `Category status has been ${
            newStatus ? "activated" : "deactivated"
          } successfully!`,
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update category status.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleViewPage = (id) => {
    navigate("/category/view", { state: { id } });
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
                    src={
                      category.image ||
                      "https://picsum.photos/200/300?grayscale"
                    }
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-3xl"
                  />
                </td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-6 py-4">
                  <div
                    className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                      category.status ? "bg-primary-dark" : "bg-[#cccccc]"
                    }`}
                    onClick={() =>
                      handleToggleStatus(category.id, category.status)
                    }
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                        category.status ? "translate-x-8" : ""
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
                    onClick={() => handleViewPage(category.id)}
                  >
                    <IoEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        category={currentCategory}
        handleSaveCategory={handleSaveCategory}
      />
    </div>
  );
}

export default Categories;
