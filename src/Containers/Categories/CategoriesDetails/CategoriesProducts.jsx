import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProductDetails } from "./useHook";

function CategoriesProducts() {
  const location = useLocation();
  const { productId } = location.state || {};
  const { getProductDetails } = useProductDetails();
  const [activeTab, setActiveTab] = useState("description");
  const [productDetails, setProductDetails] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (productId) {
      getProductDetails(productId, setProductDetails);
    }
  }, [productId]); // Removed `getProductDetails` from dependency array

  if (!productDetails) {
    return <div className="text-center py-6">Loading product details...</div>;
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col p-4 overflow-hidden">
      <div className="bg-white shadow-md rounded-lg p-3 mb-6 flex-grow overflow-y-auto">
        <div className="flex items-center gap-4">
          <img
            src={productDetails.colors[0].image}
            alt={productDetails.name}
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Name: {productDetails.name}
            </h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              ${productDetails.price}
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
              <strong>Options:</strong>{" "}
              {Object.entries(productDetails.options || {})
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Color:</strong> {productDetails.colors[0].color || {}}
            </p>
          </div>
        </div>

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
                activeTab === "addiotionalInformation"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("addiotionalInformation")}
            >
              Additional Info
            </button>
          </div>

          <div className="w-full p-4">
            {activeTab === "shortDescription" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Short Description:</strong>{" "}
                {productDetails.shortDescription}
              </p>
            )}
            {activeTab === "description" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong> {productDetails.description}
              </p>
            )}
            {activeTab === "addiotionalInformation" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Additional Info:</strong>{" "}
                {productDetails.addiotionalInformation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesProducts;
