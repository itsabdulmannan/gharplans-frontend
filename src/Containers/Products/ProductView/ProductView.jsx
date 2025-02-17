import React, { useEffect, useState } from "react";
import { mockProducts } from "../../../Components/Data/MockData";
import DiscountModal from "../../../Components/Modals/DiscounTier/DiscountTier";
import ProductModal from "../../../Components/Modals/Products/AddProducts";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useDiscountTier } from "./useHook";
import FeaturedProductModal from "../../../Components/Modals/FeaturedProducts/FeaturedProduct";

const ProductDetails = () => {
  const { showOnHomeScreen, getProductData, addStock } = useDiscountTier();
  const [productData, setProductData] = useState(null);
  const location = useLocation();
  const { id } = location?.state || {};
  const [formData, setFormData] = useState({ ...mockProducts });
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // NEW: handle featured modal state
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);

  const [stockQuantity, setStockQuantity] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (id) {
      getProductData(id, setProductData);
    }
  }, [id]);

  useEffect(() => {
    if (productData) {
      setFormData(productData);
      if (productData.colors && productData.colors.length > 0) {
        setSelectedColorIndex(0);
        setSelectedImageIndex(0);
      }
    }
  }, [productData]);

  const handleStockUpdate = () => {
    setStockQuantity(productData?.totalProducts || 0);
    setIsStockModalOpen(true);
  };

  const handleStockChange = (e) => {
    let value = e.target.value;
    // Remove leading zeros, but leave "0" if it's the only digit
    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    setStockQuantity(value);
  };

  const handleStockSubmit = () => {
    const numericValue = parseInt(stockQuantity, 10);
    if (isNaN(numericValue) || numericValue <= 0) {
      Swal.fire(
        "Invalid Quantity",
        "Please enter a valid quantity greater than 0",
        "error"
      );
      return;
    }
    addStock(id, numericValue).then(() => {
      setIsStockModalOpen(false);
      setStockQuantity(0);
      // Refresh product data after stock update
      getProductData(id, setProductData);
    });
  };

  const handleAddDiscountDetail = () => {
    setIsDiscountModalOpen(true);
  };
  const closeDiscountModal = () => {
    setIsDiscountModalOpen(false);
  };

  // NEW: featured product handlers
  const handleAddFeaturedProduct = () => {
    setIsFeaturedModalOpen(true);
  };
  const closeFeaturedModal = () => {
    setIsFeaturedModalOpen(false);
  };

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Top Header */}
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Product Details</h2>
          <p className="mt-2">
            Available Stock: {productData?.totalProducts || "Not Added"}
          </p>
        </div>
        <div className="flex space-x-4">
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
          {/* NEW: Add Featured Product Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleAddFeaturedProduct}
          >
            Add Featured Product
          </button>
        </div>
      </div>

      {/* Main Product Info */}
      <div className="max-w-6xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Information */}
          <div className="md:w-full">
            <h2 className="text-3xl font-bold mb-4">
              {formData.name || "Unnamed Product"}
            </h2>
            <p className="text-xl font-semibold mb-2">
              {formData.currency} {formData.price || "N/A"}
            </p>
            <div className="mb-2 flex items-center">
              <span className="font-semibold mr-2">Colors:</span>
              {productData?.colors && productData.colors.length > 0 ? (
                productData.colors.map((colorObj, index) => (
                  <div
                    key={colorObj.id || index}
                    className="w-6 h-6 rounded-full border border-gray-300 mr-1"
                    style={{ backgroundColor: colorObj.color || "transparent" }}
                    title={colorObj.color || "No Color"}
                  ></div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
            <p className="mb-2">
              <span className="font-semibold">Status: </span>
              <span
                className={`font-semibold ${
                  formData.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {formData.status ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Weight: </span>
              {formData.weight || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Dimensions: </span>
              {formData.dimension || "N/A"}
            </p>
          </div>
        </div>

        {/* Tabbed Descriptions */}
        <div className="mt-6 border-t pt-4">
          <div className="flex border-b border-gray-300">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "shortDescription"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("shortDescription")}
            >
              Short Description
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "addiotionalInformation"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("addiotionalInformation")}
            >
              Additional Info
            </button>
          </div>
          <div className="p-4">
            {activeTab === "shortDescription" && (
              <p>
                {formData.shortDescription || "No short description available"}
              </p>
            )}
            {activeTab === "description" && (
              <p>{formData.description || "No description available"}</p>
            )}
            {activeTab === "addiotionalInformation" && (
              <p>
                {formData.addiotionalInformation ||
                  "No additional information available"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Images by Color */}
      {productData?.colors && productData.colors.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Product Images by Color</h2>
          {/* Color Swatches */}
          <div className="flex space-x-4 mb-4">
            {productData.colors.map((colorObj, index) => (
              <div
                key={colorObj.id || index}
                className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                  selectedColorIndex === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: colorObj.color || "transparent" }}
                onClick={() => {
                  setSelectedColorIndex(index);
                  setSelectedImageIndex(0);
                }}
                title={colorObj.color || "No Color"}
              ></div>
            ))}
          </div>
          {/* Main Image and Thumbnails for Selected Color */}
          {productData.colors[selectedColorIndex] &&
            productData.colors[selectedColorIndex].image &&
            productData.colors[selectedColorIndex].image.length > 0 && (
              <div>
                <img
                  src={
                    productData.colors[selectedColorIndex].image[
                      selectedImageIndex
                    ]
                  }
                  alt={`Main view for ${
                    productData.colors[selectedColorIndex].color || "Color"
                  }`}
                  className="w-[450px] h-[450px] object-cover rounded"
                />
                <div className="mt-2 flex space-x-2">
                  {productData.colors[selectedColorIndex].image.map(
                    (imgUrl, idx) => (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`Thumbnail ${idx}`}
                        className={`w-20 h-20 object-cover rounded cursor-pointer ${
                          selectedImageIndex === idx
                            ? "border-2 border-blue-500"
                            : "border"
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      />
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Stock Modal */}
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
              onChange={handleStockChange}
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

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <DiscountModal
          isOpen={isDiscountModalOpen}
          onClose={closeDiscountModal}
          productId={id}
        />
      )}

      {/* NEW: Featured Modal */}
      {isFeaturedModalOpen && (
        <FeaturedProductModal
          isOpen={isFeaturedModalOpen}
          onClose={closeFeaturedModal}
          productId={id}
          // You can pass additional props if you want to fetch the list
          // of products or handle the add/delete logic inside the modal.
        />
      )}

      {/* {isEditModalOpen && (
        <ProductModal
          showModal={isEditModalOpen}
          setShowModal={setIsEditModalOpen}
          productToEdit={productData}
        />
      )} */}
    </>
  );
};

export default ProductDetails;
