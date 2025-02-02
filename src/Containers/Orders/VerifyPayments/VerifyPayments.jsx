import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useOrderPayments } from "./useHook";

function VerifyPayments() {
  const { getPayment, verifyPayment } = useOrderPayments();
  const [verifiedPayments, setVerifiedPayments] = useState([]);
  const [rejectedPayments, setRejectedPayments] = useState([]);
  const [acceptedPayments, setAcceptedPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentAction, setCurrentAction] = useState("");
  useEffect(() => {
    fetchPaymentData(activeTab);
  }, [activeTab]);

  const fetchPaymentData = async (status) => {
    try {
      const response = await getPayment(status);
      if (status === "pending") {
        setVerifiedPayments(response.data.pendingPaymentScreenshots);
      } else if (status === "approved") {
        setAcceptedPayments(response.data.approvedPaymentScreenshots);
      } else if (status === "rejected") {
        setRejectedPayments(response.data.rejectedPaymentScreenshots);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const handleAccept = (orderId) => {
    setCurrentOrderId(orderId);
    setCurrentAction("accept");
    setModalMessage(
      `Are you sure you want to accept the payment for Order ID ${orderId}?`
    );
    setShowModal(true);
  };

  const handleReject = (orderId) => {
    setCurrentOrderId(orderId);
    setCurrentAction("reject");
    setModalMessage(
      `Are you sure you want to reject the payment for Order ID ${orderId}?`
    );
    setShowModal(true);
  };

  const handleDownload = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "payment_receipt.jpg";
    link.click();
  };

  const confirmAction = async () => {
    if (currentAction && currentOrderId) {
      const status = currentAction === "accept" ? "approved" : "rejected";
      try {
        const response = await verifyPayment(currentOrderId, status);
        if (response.status === 200) {
          const updatedOrder = verifiedPayments.find(
            (order) => order.orderId === currentOrderId
          );
          if (updatedOrder) {
            updatedOrder.status = status;
            setVerifiedPayments((prevData) =>
              prevData.filter((order) => order.orderId !== currentOrderId)
            );
            if (status === "approved") {
              setAcceptedPayments((prev) => [...prev, updatedOrder]);
            } else {
              setRejectedPayments((prev) => [...prev, updatedOrder]);
            }

            Swal.fire({
              icon: "success",
              title: `Payment ${
                currentAction === "accept" ? "Approved" : "Rejected"
              }`,
              text: `Payment for Order ID ${currentOrderId} has been successfully ${
                currentAction === "accept" ? "approved" : "rejected"
              }.`,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Update Status",
            text: "An error occurred while updating the payment status. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error while updating payment status", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred while updating the payment status.",
        });
      }
    }
    setShowModal(false);
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  const renderTable = (data, isPending = false) => (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed">
        <thead>
          <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
            <th className="p-4 text-left">Sr No</th>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Payment Type</th>
            {isPending ? (
              <th className="p-4 text-left">Actions</th>
            ) : (
              <th className="p-4 text-left">Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            data.map((order, index) => (
              <tr key={order.id}>
                <td className="px-4 py-5 border-b">{index + 1}</td>
                <td className="px-4 py-5 border-b">{order.orderId}</td>
                <td className="px-4 py-5 border-b">{order.paymentType}</td>
                {isPending ? (
                  <td className="px-4 py-5 border-b">
                    <button
                      onClick={() => handleAccept(order.orderId)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(order.orderId)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mr-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDownload(order.screenShot)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Download Slip
                    </button>
                  </td>
                ) : (
                  <td className="px-4 py-5 border-b capitalize">
                    {order.paymentStatus}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6">
      <div className="bg-gray-100 p-4 flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Verify Payments</h2>
      </div>

      <div className="flex space-x-8 mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 w-full rounded ${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Pending Payments
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 w-full rounded ${
            activeTab === "approved"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Approved Payments
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-4 py-2 w-full rounded ${
            activeTab === "rejected"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Rejected Payments
        </button>
      </div>

      {activeTab === "pending" && renderTable(verifiedPayments, true)}
      {activeTab === "approved" && renderTable(acceptedPayments)}
      {activeTab === "rejected" && renderTable(rejectedPayments)}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold text-center">{modalMessage}</h3>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={confirmAction}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={cancelAction}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPayments;
