import React, { useState, useEffect } from "react";
import ProductModal from "../../../Components/Modals/Products/AddProducts";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon
import {
  mockCategories,
  mockProducts,
} from "../../../Components/Data/MockData";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(mockCategories);
    setProducts(mockProducts);
  }, []);

  const addProduct = (productData) => {
    setProducts([...products, productData]);
  };

  const editProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setProductToEdit(productToEdit);
    setShowModal(true);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleViewPage = () => {
    navigate("/products/view");
  };

  const handleToggleStatus = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "Active" ? "Inactive" : "Active",
            }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => {
            setProductToEdit(null);
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      {categories.length > 0 && (
        <ProductModal
          categories={categories}
          showModal={showModal}
          setShowModal={setShowModal}
          addProduct={addProduct}
          productToEdit={productToEdit}
          handleProductUpdate={handleProductUpdate}
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
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
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
                  {product.categoryId.name}
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
                      product.status === "Active"
                        ? "bg-primary-dark"
                        : "bg-[#cccccc]"
                    }`}
                    onClick={() => handleToggleStatus(product.id)}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                        product.status === "Active" ? "translate-x-8" : ""
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.color}
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={handleViewPage}
                  >
                    <IoEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
