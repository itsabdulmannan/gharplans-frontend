import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProductDetails } from "./useHook";

function CategoriesProducts() {
  const location = useLocation();
  const { productId } = location.state || {};
  const { getProductDetails } = useProductDetails();
  const [activeTab, setActiveTab] = useState("description");
  const [productDetails, setProductDetails] = useState(null);
  // State for color and image selection
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (productId) {
      getProductDetails(productId, (data) => {
        setProductDetails(data);
        // Reset color and image selection if colors are available
        if (data && data.colors && data.colors.length > 0) {
          setSelectedColorIndex(0);
          setSelectedImageIndex(0);
        }
      });
    }
  }, [productId]);

  if (!productDetails) {
    return <div className="text-center py-6">Loading product details...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-4 overflow-hidden">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex-grow overflow-y-auto">
        {/* Product Basic Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Name: {productDetails.name || "Unnamed Product"}
            </h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              {productDetails.currency || ""} {productDetails.price || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  productDetails.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {productDetails.status ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Weight:</strong>{" "}
              {productDetails.weight ? productDetails.weight : "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Dimensions:</strong>{" "}
              {productDetails.dimension ? productDetails.dimension : "N/A"}
            </p>
          </div>
        </div>

        {/* Color Selector Section */}
        {productDetails.colors && productDetails.colors.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Available Colors
            </h2>
            {/* Colors shown in a row as swatches */}
            <div className="flex space-x-4">
              {productDetails.colors.map((colorObj, index) => (
                <div
                  key={colorObj.id || index}
                  onClick={() => {
                    setSelectedColorIndex(index);
                    setSelectedImageIndex(0);
                  }}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                    selectedColorIndex === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: colorObj.color || "transparent" }}
                  title={colorObj.color || "No Color"}
                ></div>
              ))}
            </div>
            {/* Display images for the selected color */}
            {productDetails.colors[selectedColorIndex] &&
              productDetails.colors[selectedColorIndex].image &&
              productDetails.colors[selectedColorIndex].image.length > 0 && (
                <div className="mt-4">
                  {/* Main Image */}
                  <img
                    src={
                      productDetails.colors[selectedColorIndex].image[
                        selectedImageIndex
                      ]
                    }
                    alt={`Main view for ${
                      productDetails.colors[selectedColorIndex].color || "Color"
                    }`}
                    className="w-[450px] h-[450px] object-cover rounded"
                  />
                  {/* Thumbnails */}
                  <div className="mt-2 flex space-x-2">
                    {productDetails.colors[selectedColorIndex].image.map(
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

        {/* Tabbed Description Section */}
        <div className="w-full mt-6">
          <div className="flex border-b border-gray-300">
            <button
              className={`w-full py-2 text-sm font-medium ${
                activeTab === "shortDescription"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("shortDescription")}
            >
              Short Description
            </button>
            <button
              className={`w-full py-2 text-sm font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("description")}
            >
              Description
            </button>
            <button
              className={`w-full py-2 text-sm font-medium ${
                activeTab === "additionalInformation"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("additionalInformation")}
            >
              Additional Info
            </button>
          </div>
          <div className="w-full p-4">
            {activeTab === "shortDescription" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Short Description:</strong>{" "}
                {productDetails.shortDescription ||
                  "No short description available"}
              </p>
            )}
            {activeTab === "description" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong>{" "}
                {productDetails.description || "No description available"}
              </p>
            )}
            {activeTab === "additionalInformation" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Additional Info:</strong>{" "}
                {productDetails.additionalInformation ||
                  "No additional information available"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesProducts;
