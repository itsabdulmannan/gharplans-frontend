import React, { useEffect, useState } from "react";
import { mockProducts } from "../../../Components/Data/MockData";
import DiscountModal from "../../../Components/Modals/DiscounTier/DiscountTier";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useDiscountTier } from "./useHook";

const ProductDetails = () => {
  const { showOnHomeScreen, getProductData, addStock } = useDiscountTier();
  const [productData, setProductData] = useState(null);
  const location = useLocation();
  const { id } = location?.state;
  const [formData, setFormData] = useState({ ...mockProducts });
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(0);
  useEffect(() => {
    getProductData(id, setProductData);
  }, [id, stockQuantity]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleStockUpdate = () => {
    setStockQuantity(productData?.totalProducts || 0);
    setIsStockModalOpen(true);
  };
  
  const handleStockSubmit = () => {
    if (stockQuantity < 0) {
      Swal.fire("Invalid Quantity", "Please enter a valid quantity", "error");
    } else {
      addStock(id, stockQuantity).then(() => {
        setIsStockModalOpen(false);
        setStockQuantity(0);
        getProductData(id, setProductData);
      });
    }
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleAddDiscountDetail = () => {
    setIsDiscountModalOpen(true);
  };
  const closeDiscountModal = () => {
    setIsDiscountModalOpen(false);
  };
  console.log(productData);
  return (
    <>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-1">View or Edit Products</h2>
        <div className="flex space-x-4">
          <h1 className="mt-2">Available Stock {productData?.totalProducts}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleStockUpdate}
          >
            Update Stock Availability
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleAddDiscountDetail}
          >
            Add Discount Detail
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-white to-gray-100 shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter product price"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter product color"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleDropdownChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Show on Home Screen
              </label>
              <select
                name="homeScreen"
                value={formData.homeScreen}
                onChange={handleDropdownChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              rows="4"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              rows="3"
              placeholder="Enter short description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              name="addiotionalInformation"
              value={formData.addiotionalInformation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              rows="3"
              placeholder="Enter additional information"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold text-sm rounded-md shadow hover:bg-blue-600 transition focus:ring focus:ring-indigo-300 "
          >
            Save Changes
          </button>
        </form>
      </div>
      {isDiscountModalOpen && (
        <DiscountModal
          isOpen={isDiscountModalOpen}
          onClose={closeDiscountModal}
          productId={id}
        />
      )}
      {isStockModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Update Stock Quantity
            </h2>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => setIsStockModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleStockSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
