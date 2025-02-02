import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDiscountTier } from "../../../Containers/Products/ProductView/useHook";

const DiscountModal = ({ isOpen, onClose, productId }) => {
  const { getDiscountTier, addDiscountTier, delteDiscountTier } =
    useDiscountTier();
  const [discountTiers, setDiscountTiers] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");
  const [discount, setDiscount] = useState("");
  const prevIsOpen = useRef(isOpen);
  const prevProductId = useRef(productId);

  useEffect(() => {
    if (productId && isOpen) {
      getDiscountTier(productId, setDiscountTiers);
    }
  }, [productId, isOpen]);

  const handleAddDiscount = () => {
    if (!startRange || !endRange || !discount) {
      alert("Please fill in all fields");
      return;
    }

    const newDiscount = {
      startRange: parseInt(startRange),
      endRange: parseInt(endRange),
      discount,
    };

    addDiscountTier(productId, newDiscount).then((updatedDiscountTiers) => {
      if (updatedDiscountTiers && Array.isArray(updatedDiscountTiers)) {
        setDiscountTiers(updatedDiscountTiers);
      } else {
        setDiscountTiers([...discountTiers, newDiscount]);
      }
      setStartRange("");
      setEndRange("");
      setDiscount("");
    });
  };

  const handleDeleteDiscount = async (discountTierId) => {
    try {
      const response = await delteDiscountTier(productId, discountTierId);
      if (response.status === 200) {
        setDiscountTiers(
          discountTiers.filter((tier) => tier.id !== discountTierId)
        );
      }
    } catch (error) {
      console.error("Error deleting discount tier:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Discount Tiers for Product #{productId}
          </h3>

          <div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Existing Discount Tiers
            </h4>
            {discountTiers.length === 0 ? (
              <p className="text-gray-500">No data found</p>
            ) : (
              <ul className="space-y-2">
                {discountTiers.map((tier) => (
                  <li
                    key={tier.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      Start Range: {tier.startRange} - End Range:{" "}
                      {tier.endRange} Discount Percentage: {tier.discount}
                    </span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteDiscount(tier.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Add New Discount Tier
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item Start Range
                </label>
                <input
                  type="number"
                  value={startRange}
                  onChange={(e) => setStartRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Start range"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item End Range
                </label>
                <input
                  type="number"
                  value={endRange}
                  onChange={(e) => setEndRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="End range"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Discount
                </label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Discount"
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <button
                onClick={handleAddDiscount}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Discount Tier
              </button>
            </div> */}
          </div>

          <div className="flex justify-between mt-6 space-x-4">
            <button
              onClick={onClose}
              className="w-1/2 p-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDiscount}
              className="w-1/2 p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DiscountModal;
