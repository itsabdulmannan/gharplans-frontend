import React, { useEffect, useState } from "react";

function FeaturedProductsAdmin() {
  // State to hold all products fetched from the backend
  const [products, setProducts] = useState([]);
  // The main product selected from the dropdown
  const [selectedMainProduct, setSelectedMainProduct] = useState(null);

  // Dummy fetch for products – replace with your API call
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Replace with your API endpoint; below is a dummy example
        const response = await fetch("/api/products");
        const data = await response.json();
        // Assume data.products is an array of { id, name, image, ... }
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // State for the list of featured products for the selected main product
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Form fields for the featured product
  const [featuredName, setFeaturedName] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  // For editing functionality
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Popup for success/error messages
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  // When a main product is selected
  const handleSelectMainProduct = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p.id === productId);
    setSelectedMainProduct(product);
    // Optionally, you could fetch featured products for that main product from your API
    setFeaturedProducts([]);
  };

  const handleAddFeaturedProduct = async () => {
    if (!selectedMainProduct) {
      setPopupMessage("Please select a main product first.");
      setPopupType("error");
      setIsPopupVisible(true);
      return;
    }
    // Replace with your API call to add the featured product
    const newFeatured = {
      id: Date.now(), // Temporary unique ID
      productId: selectedMainProduct.id,
      name: featuredName,
      image: featuredImage,
    };

    setFeaturedProducts([...featuredProducts, newFeatured]);
    setPopupMessage("Featured product added successfully!");
    setPopupType("success");
    setIsPopupVisible(true);
    // Clear the form fields
    setFeaturedName("");
    setFeaturedImage("");
  };

  const handleEditFeaturedProduct = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setFeaturedName(product.name);
    setFeaturedImage(product.image);
  };

  const handleUpdateFeaturedProduct = async () => {
    // Replace with API call to update the featured product if needed
    const updatedProducts = featuredProducts.map((prod) => {
      if (prod.id === editingId) {
        return {
          ...prod,
          name: featuredName,
          image: featuredImage,
        };
      }
      return prod;
    });
    setFeaturedProducts(updatedProducts);
    setPopupMessage("Featured product updated successfully!");
    setPopupType("success");
    setIsPopupVisible(true);
    setIsEditing(false);
    setEditingId(null);
    setFeaturedName("");
    setFeaturedImage("");
  };

  const handleDeleteFeaturedProduct = async (id) => {
    // Replace with API call to delete the featured product if needed
    const updatedProducts = featuredProducts.filter((prod) => prod.id !== id);
    setFeaturedProducts(updatedProducts);
    setPopupMessage("Featured product removed successfully!");
    setPopupType("success");
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Featured Products</h2>
      </div>

      {/* Main Product Selection */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg mx-auto max-w-3xl">
        <h3 className="text-xl font-semibold mb-4">Select Main Product</h3>
        <select
          value={selectedMainProduct ? selectedMainProduct.id : ""}
          onChange={handleSelectMainProduct}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">-- Select Product --</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
        {selectedMainProduct && (
          <div className="mt-4 p-4 border rounded">
            <h4 className="text-lg font-semibold">Main Product Details</h4>
            <p>
              <span className="font-bold">ID:</span> {selectedMainProduct.id}
            </p>
            <p>
              <span className="font-bold">Name:</span> {selectedMainProduct.name}
            </p>
            {selectedMainProduct.image && (
              <img
                src={selectedMainProduct.image}
                alt={selectedMainProduct.name}
                className="w-24 h-24 object-cover mt-2"
              />
            )}
          </div>
        )}
      </div>

      {/* Featured Product Form */}
      {selectedMainProduct && (
        <div className="mt-6 bg-white p-6 shadow-md rounded-lg mx-auto max-w-3xl">
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit Featured Product" : "Add Featured Product"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Featured Name</label>
              <input
                type="text"
                value={featuredName}
                onChange={(e) => setFeaturedName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Enter featured name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Featured Image URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateFeaturedProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setFeaturedName("");
                    setFeaturedImage("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddFeaturedProduct}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Featured Product
              </button>
            )}
          </div>
        </div>
      )}

      {/* Featured Products List */}
      {selectedMainProduct && (
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg mx-auto max-w-3xl">
          <h3 className="text-xl font-semibold mb-4">
            Featured Products List
          </h3>
          {featuredProducts.length === 0 ? (
            <p className="text-gray-600 text-center">
              No featured products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {featuredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Name: <span className="font-normal">{prod.name}</span>
                    </p>
                    <p className="text-gray-700">
                      Image:{" "}
                      <a
                        href={prod.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {prod.image}
                      </a>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditFeaturedProduct(prod)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFeaturedProduct(prod.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Popup Notification */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all scale-105">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              {popupType === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="green"
                  className="w-10 h-10 mb-4 sm:mb-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="red"
                  className="w-10 h-10 mb-4 sm:mb-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {popupMessage}
                </h3>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closePopup}
                className={`px-4 py-2 rounded-lg shadow-md text-white ${
                  popupType === "success"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedProductsAdmin;
