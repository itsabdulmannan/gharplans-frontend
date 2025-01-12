import React, { useState } from "react";
import user from "../../assets/user-image.png";

function Review() {
  // Static reviews array
  const reviews = [
    {
      userName: "Jerry",
      rating: 4,
      timeAgo: "3 days ago",
      review: "Great product!",
      product: "Product Name 1",
    },
    {
      userName: "Alice",
      rating: 5,
      timeAgo: "2 days ago",
      review: "Excellent service!",
      product: "Product Name 2",
    },
    {
      userName: "Bob",
      rating: 3,
      timeAgo: "1 week ago",
      review: "Good, but could be better.",
      product: "Product Name 3",
    },
  ];

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'
  const [productName, setProductName] = useState("");

  const handleButtonClick = (action, product) => {
    if (action === "accept") {
      setPopupMessage("Review has been accepted successfully!");
      setPopupType("success");
    } else {
      setPopupMessage("Review has been rejected successfully!");
      setPopupType("error");
    }
    setProductName(product);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Manage Reviews</h2>
      </div>

      <div className="bg-gray-50 p-10">
        <div className="bg-white p-6 shadow-md rounded-lg mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            All Reviews
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex items-center space-x-4 border-b pb-4 mb-4">
                  <img
                    src={user}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-gray-500">{review.timeAgo}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{review.review}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Product: <span className="font-bold">{review.product}</span>
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleButtonClick("accept", review.product)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleButtonClick("reject", review.product)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg custom-popup transform transition-all scale-105">
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
                  <p className="text-gray-600 mt-4">
                    Product Name:{" "}
                    <span className="font-bold">{productName}</span>
                  </p>
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
    </>
  );
}

export default Review;
