import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function ProductDeliveryCharges() {
  const [deliveryCharges, setDeliveryCharges] = useState([
    {
      sourceCity: "New York",
      destinationCity: "Los Angeles",
      product: "Product A",
      price: "50",
    },
    {
      sourceCity: "Chicago",
      destinationCity: "New York",
      product: "Product B",
      price: "30",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const cities = ["New York", "Los Angeles", "Chicago"];
  const products = ["Product A", "Product B", "Product C"];

  const openModal = (index = null) => {
    if (index !== null) {
      const charge = deliveryCharges[index];
      setSourceCity(charge.sourceCity);
      setDestinationCity(charge.destinationCity);
      setProduct(charge.product);
      setPrice(charge.price);
      setEditIndex(index);
    } else {
      setSourceCity("");
      setDestinationCity("");
      setProduct("");
      setPrice("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  const addOrEditDeliveryCharge = () => {
    if (sourceCity && destinationCity && product && price) {
      if (editIndex !== null) {
        const updatedCharges = [...deliveryCharges];
        updatedCharges[editIndex] = {
          sourceCity,
          destinationCity,
          product,
          price,
        };
        setDeliveryCharges(updatedCharges);
      } else {
        setDeliveryCharges([
          ...deliveryCharges,
          { sourceCity, destinationCity, product, price },
        ]);
      }
      closeModal();
    }
  };

  const deleteDeliveryCharge = () => {
    if (deleteIndex !== null) {
      setDeliveryCharges(
        deliveryCharges.filter((_, index) => index !== deleteIndex)
      );
      closeDeleteModal();
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Product Delivery Charges</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Delivery Charge
        </button>
      </div>
      <div className="bg-gray-50">
        <div className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Delivery Charges Table */}
          {deliveryCharges.length > 0 ? (
            <div>
              {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Delivery Charges List
              </h2> */}
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mt-5">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">
                      Source City
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">
                      Destination City
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryCharges.map((charge, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 text-gray-800">
                        {charge.sourceCity}
                      </td>
                      <td className="px-6 py-3 text-gray-800">
                        {charge.destinationCity}
                      </td>
                      <td className="px-6 py-3 text-gray-800">
                        {charge.product}
                      </td>
                      <td className="px-6 py-3 text-gray-800">
                        ${charge.price}
                      </td>
                      <td className="px-6 py-3 text-gray-800 flex space-x-2">
                        <button
                          onClick={() => openDeleteModal(index)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                        >
                          <MdDelete />
                        </button>
                        <button
                          className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                          onClick={() => openModal(index)}
                        >
                          <MdEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No delivery charges added yet.</p>
          )}
        </div>

        {/* Add/Edit Delivery Charge Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {editIndex !== null
                  ? "Edit Delivery Charge"
                  : "Add Delivery Charge"}
              </h2>
              <div className="space-y-4">
                {/* Source City */}
                <select
                  value={sourceCity}
                  onChange={(e) => setSourceCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Source City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {/* Destination City */}
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Destination City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {/* Product */}
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Product</option>
                  {products.map((prod, index) => (
                    <option key={index} value={prod}>
                      {prod}
                    </option>
                  ))}
                </select>
                {/* Price */}
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg shadow-md text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditDeliveryCharge}
                  className="px-4 py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600"
                >
                  {editIndex !== null ? "Save Changes" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to delete this item?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 rounded-lg shadow-md text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteDeliveryCharge}
                  className="px-4 py-2 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDeliveryCharges;
