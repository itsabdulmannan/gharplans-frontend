import React, { useEffect, useState } from "react";
import user from "../../assets/user-image.png";
import { useReviews } from "./useHook";

function Review() {
  const { getReviews, acceptReviews } = useReviews();
  const [reviews, setReviews] = useState([]);
  const [approvedReviews, setApprovedReviews] = useState([]); // Changed from acceptedReviews to approvedReviews
  const [rejectedReviews, setRejectedReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    getReviews(activeTab, setReviews);
  }, [activeTab]);

  useEffect(() => {
    if (reviews?.data) {
      setApprovedReviews(
        reviews.data.filter((review) => review.status === "approved") // Changed from accepted to approved
      );
      setRejectedReviews(
        reviews.data.filter((review) => review.status === "rejected")
      );
      setPendingReviews(
        reviews.data.filter((review) => review.status === "pending")
      );
    }
  }, [reviews]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [productName, setProductName] = useState("");

  const handleButtonClick = async (action, review) => {
    const status = action === "accept" ? "approved" : "rejected"; // Changed from accept to approved
    const body = {
      reviewId: review.id,
      userId: review.user.id,
      status: status,
    };

    try {
      await acceptReviews(body); // This still handles approval and rejection
      setPopupMessage(
        `Review has been ${status === "approved" ? "approved" : "rejected"} successfully!` // Changed from accepted to approved
      );
      setPopupType(status === "approved" ? "success" : "error");
      setProductName(review.product.name);
      setIsPopupVisible(true);

      setReviews((prevReviews) => {
        const updatedReviews = prevReviews.data.map((r) => {
          if (r.id === review.id) {
            return { ...r, status: status };
          }
          return r;
        });
        return { ...prevReviews, data: updatedReviews };
      });
    } catch (error) {
      console.error("Error updating review status:", error);
      setPopupMessage("An error occurred while updating the review status.");
      setPopupType("error");
      setIsPopupVisible(true);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const getReviewsForTab = () => {
    switch (activeTab) {
      case "approved": // Changed from accepted to approved
        return approvedReviews;
      case "rejected":
        return rejectedReviews;
      default:
        return pendingReviews;
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Manage Reviews</h2>
      </div>

      <div className="bg-gray-50 p-10">
        <div className="bg-white p-6 shadow-md rounded-lg mx-auto">
          <div className="flex space-x-6 border-b pb-4 mb-6">
            <button
              onClick={() => setActiveTab("pending")}
              className={`${
                activeTab === "pending"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : ""
              } px-4 py-2`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("approved")} // Changed from accepted to approved
              className={`${
                activeTab === "approved" // Changed from accepted to approved
                  ? "text-green-500 border-b-2 border-green-500"
                  : ""
              } px-4 py-2`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`${
                activeTab === "rejected"
                  ? "text-red-500 border-b-2 border-red-500"
                  : ""
              } px-4 py-2`}
            >
              Rejected
            </button>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reviews
          </h2>

          {getReviewsForTab()?.length === 0 ? (
            <p className="text-gray-600 text-center">No reviews found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getReviewsForTab()?.map((review, index) => (
                <div key={index} className="bg-white p-6 shadow-md rounded-lg">
                  <div className="flex items-center space-x-4 border-b pb-4 mb-4">
                    <img
                      src={user}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {review.user.firstName} {review.user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{review.review}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Product:{" "}
                    <span className="font-bold">{review.product.name}</span>
                  </p>
                  {activeTab === "pending" && (
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleButtonClick("accept", review)} // Changed from accept to approved
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleButtonClick("reject", review)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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
