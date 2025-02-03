// Products.js
import React, { useState, useEffect } from "react";
import ProductModal from "../../../Components/Modals/Products/AddProducts";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "./useHook";
import Swal from "sweetalert2";

function Products() {
  const {
    getCategories,
    getProducts,
    updateProductStatus,
    deleteProduct,
    addProduct,
  } = useProducts();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories(setCategories);
    getProducts(setProducts);
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const response = await addProduct(productData);

      if (response) {
        setProducts([...products, response]);
        Swal.fire({
          title: "Success",
          text: "Product has been added successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add product.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleViewPage = (id) => {
    navigate("/products/view", { state: { id } });
  };
  const handleQuotationPageView = () => {
    navigate("/quotation");
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await updateProductStatus(id, newStatus);

      if (response) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, status: newStatus } : product
          )
        );

        Swal.fire({
          title: "Success",
          text: `Product status has been ${
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
        text: error.message || "Failed to update product status.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteProduct(id);
        if (response) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );

          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete the product. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleQuotationPageView}
          >
            Get Quotation
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => {
              setProductToEdit(null);
              setShowModal(true);
            }}
          >
            Add Product
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => {
              setProductToEdit(null);
              setShowModal(true);
            }}
          >
            Add Featured Products
          </button>
        </div>
      </div>

      {categories.length > 0 && (
        <ProductModal
          categories={categories}
          showModal={showModal}
          setShowModal={setShowModal}
          addProduct={handleAddProduct}
          productToEdit={productToEdit}
        />
      )}

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
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Color
              </th>
              {/* <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors duration-300`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-full shadow-lg"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.category?.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${product.price}
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                      product.status ? "bg-primary-dark" : "bg-[#cccccc]"
                    }`}
                    onClick={() =>
                      handleToggleStatus(product.id, product.status)
                    }
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                        product.status ? "translate-x-8" : ""
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.colors[0]?.color || "N/A"}
                </td>
                {/* <td className="px-6 py-4 flex space-x-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={() => handleViewPage(product.id)}
                  >
                    <IoEye />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
