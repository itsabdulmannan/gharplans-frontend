import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { featuredProductHook } from "./useHook";

const FeaturedProductModal = ({ isOpen, onClose, productId }) => {
  const {
    getAllProducts,
    addFeaturedProduct,
    getRelation,
    deleteLinkedProduct,
  } = featuredProductHook();
  const [productsData, setProductsData] = useState([]); // Initialize as empty array
  const [selectedFeaturedIds, setSelectedFeaturedIds] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [featuredProductsRelationsData, setFeaturedProductsRelationsData] =
    useState([]); // Initialize as empty array
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      getAllProducts((data) => {
        setProductsData(data || []); // Ensure data is an array, default to empty array if undefined
      }, productId);
      setSelectedFeaturedIds([]);
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    getRelation(productId, (data) => {
      setFeaturedProductsRelationsData(data || []); // Ensure data is an array, default to empty array if undefined
    });
  }, [productId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleToggleFeatured = (id) => {
    if (selectedFeaturedIds.includes(id)) {
      setSelectedFeaturedIds((prev) => prev.filter((pid) => pid !== id));
    } else {
      setSelectedFeaturedIds((prev) => [...prev, id]);
    }
  };

  const handleRemoveChip = (id) => {
    setSelectedFeaturedIds((prev) => prev.filter((pid) => pid !== id));
  };

  const handleSubmitFeatured = async () => {
    const payload = { productId, featuredIds: selectedFeaturedIds };
    await addFeaturedProduct(payload);
    console.log("Payload:", payload);
    Swal.fire({
      title: "Success",
      text: "Product added successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      onClose();
    });
  };

  const handleDeleteLinkedProduct = async (id) => {
    // Call the delete function (you can adjust it to your API structure)
    await deleteLinkedProduct(id);
    Swal.fire({
      title: "Deleted",
      text: "Linked product has been deleted.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // After deletion, refresh the linked products data
      getRelation(productId, setFeaturedProductsRelationsData);
    });
  };

  const mainProduct =
    productsData && productsData.length > 0
      ? productsData.find((p) => p.id === productId)
      : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add/Delete Featured Products</h2>

        {/* Linked Products Section */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Linked Products</h3>
          <ul className="mt-2">
            {Array.isArray(featuredProductsRelationsData) &&
            featuredProductsRelationsData.length > 0 ? (
              featuredProductsRelationsData.map((relation) => (
                <li
                  key={relation.similarProductId}
                  className="mb-2 flex justify-between items-center"
                >
                  <span>
                    {relation.similarProductDetails?.name || "Unknown Product"}
                  </span>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDeleteLinkedProduct(relation.id)} // Pass the product ID to delete
                  >
                    &times; {/* Cross icon for deletion */}
                  </button>
                </li>
              ))
            ) : (
              <p>No linked products available</p>
            )}
          </ul>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {selectedFeaturedIds.map((id) => {
            const product = productsData.find((p) => p.id === id);
            return (
              <span
                key={id}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {product?.name || "Unknown"}
                <button
                  className="ml-2 text-blue-700 hover:text-blue-900"
                  onClick={() => handleRemoveChip(id)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md text-left focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {selectedFeaturedIds.length
              ? "Add more products..."
              : "Select products..."}
          </button>

          {isDropdownOpen &&
            Array.isArray(productsData) &&
            productsData.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto">
                {productsData.map((prod) => (
                  <div
                    key={prod.id}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => handleToggleFeatured(prod.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeaturedIds.includes(prod.id)}
                      readOnly
                      className="mr-2"
                    />
                    {console.log(prod)}
                    <span>{prod.name || "Unknown Product"}</span>{" "}
                    {/* Show product name */}
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSubmitFeatured}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductModal;
