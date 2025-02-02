import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDeliveryCharges } from "./useHook";
import Swal from "sweetalert2";

function ProductDeliveryCharges() {
  const {
    addProductDeliveryCharges,
    getCities,
    getProductDeliveryCharges,
    getProducts,
    deleteProductDeliveryCharges,
    editProductDeliveryCharges,
  } = useDeliveryCharges();
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const openModal = (index = null) => {
    if (index !== null) {
      const charge = deliveryCharges[index];
      setSourceCity(charge.sourceCityId || ""); // Use sourceCityId to ensure proper pre-selection
      setDestinationCity(charge.destinationCityId || ""); // Use destinationCityId to ensure proper pre-selection
      setProduct(charge.product?.id || ""); // Set product ID for proper selection
      setPrice(charge.price || ""); // Set the price value
      setEditIndex(index);
    } else {
      setSourceCity("");
      setDestinationCity("");
      setProduct("");
      setPrice("");
    }
    setIsModalOpen(true);
  };
  

  useEffect(() => {
    getCities(setCities);
    getProducts(setProducts);
    getProductDeliveryCharges(setDeliveryCharges);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const addOrEditDeliveryCharge = async () => {
    if (sourceCity && destinationCity && product && price) {
      const payload = {
        sourceCityId: sourceCity,
        destinationCityId: destinationCity,
        productId: product,
        price,
      };

      if (editIndex !== null) {
        // Editing an existing delivery charge
        const chargeToEdit = deliveryCharges[editIndex];
        try {
          const response = await editProductDeliveryCharges(
            chargeToEdit.id,
            payload
          );
          if (response?.status === 200) {
            const updatedCharge = {
              ...response.data,
              sourceCity: cities.find(
                (city) => city.id === response.data.sourceCityId
              ).name,
              destinationCity: cities.find(
                (city) => city.id === response.data.destinationCityId
              ).name,
              product: products.find(
                (prod) => prod.id === response.data.productId
              ),
            };

            setDeliveryCharges((prev) => {
              const updatedCharges = [...prev];
              updatedCharges[editIndex] = updatedCharge;
              return updatedCharges;
            });

            Swal.fire(
              "Success!",
              "Delivery charge updated successfully.",
              "success"
            );
          } else {
            Swal.fire(
              "Error!",
              "Failed to update the delivery charge.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.message || "Something went wrong.",
            "error"
          );
        }
      } else {
        // Adding a new delivery charge
        try {
          const response = await addProductDeliveryCharges(payload);
          if (response?.data) {
            const newCharge = {
              ...response.data,
              sourceCity: cities.find(
                (city) => city.id === response.data.sourceCityId
              ).name,
              destinationCity: cities.find(
                (city) => city.id === response.data.destinationCityId
              ).name,
              product: products.find(
                (prod) => prod.id === response.data.productId
              ),
            };
            setDeliveryCharges([...deliveryCharges, newCharge]);
            Swal.fire(
              "Success!",
              "Delivery charge added successfully.",
              "success"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.message || "Something went wrong.",
            "error"
          );
        }
      }
      closeModal();
    } else {
      Swal.fire("Error!", "Please fill in all fields.", "error");
    }
  };

  const deleteDeliveryCharge = async (index) => {
    const chargeToDelete = deliveryCharges[index];

    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the delivery charge for ${
        chargeToDelete.product?.name || "this item"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProductDeliveryCharges(
            chargeToDelete.id
          );

          if (response?.status === 200) {
            Swal.fire(
              "Deleted!",
              "The delivery charge has been deleted.",
              "success"
            );
            setDeliveryCharges((prev) => prev.filter((_, i) => i !== index));
            getProductDeliveryCharges(setDeliveryCharges);
          } else {
            Swal.fire(
              "Error!",
              "Failed to delete the delivery charge.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.message || "Something went wrong.",
            "error"
          );
        }
      }
    });
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
          {deliveryCharges.length > 0 ? (
            <div>
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
                        {charge.product?.name || "Unknown Product"}
                      </td>
                      <td className="px-6 py-3 text-gray-800">
                        ${charge.deliveryCharge || "N/A"}
                      </td>
                      <td className="px-6 py-3 text-gray-800 flex space-x-2">
                        <button
                          onClick={() => deleteDeliveryCharge(index)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                        >
                          <MdDelete />
                        </button>
                        {/* <button
                          className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                          onClick={() => openModal(index)}
                        >
                          <MdEdit />
                        </button> */}
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {editIndex !== null
                  ? "Edit Delivery Charge"
                  : "Add Delivery Charge"}
              </h2>
              <div className="space-y-4">
                <select
                  value={sourceCity}
                  onChange={(e) => setSourceCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Source City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>

                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Destination City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>

                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Product</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
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
      </div>
    </>
  );
}

export default ProductDeliveryCharges;
