import React, { useState } from "react";
import { mockProducts } from "../../../Components/Data/MockData";

function CategoriesProducts() {
  const product = mockProducts[0];
  const [activeTab, setActiveTab] = useState("description"); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-3 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Name: {product.name}
            </h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              ${product.price}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  product.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Options:</strong> {product.options?.join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Color:</strong>{" "}
              {Array.isArray(product.color)
                ? product.color.join(", ")
                : product.color}
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

          {/* Tab Content (Full Width) */}
          <div className="w-full p-4">
            {activeTab === "shortDescription" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Short Description:</strong> {product.shortDescription}
              </p>
            )}
            {activeTab === "description" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong> {product.description}
              </p>
            )}
            {activeTab === "addiotionalInformation" && (
              <p className="text-sm text-gray-600 mb-4">
                <strong>Additional Info:</strong>{" "}
                {product.additionalInformation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesProducts;
