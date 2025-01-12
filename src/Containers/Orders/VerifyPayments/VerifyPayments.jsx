import React, { useState } from "react";
import { verifyPayments } from "../../../Components/Data/MockData";

function VerifyPayments() {
  const [orders, setOrders] = useState(verifyPayments);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const handleAccept = (orderId) => {
    setCurrentOrderId(orderId);
    setModalMessage(
      `Are you sure you want to accept the payment for Order ID ${orderId}?`
    );
    setShowModal(true);
  };

  const handleReject = (orderId) => {
    setCurrentOrderId(orderId);
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

  const confirmAction = () => {
    setOrders(orders.filter((order) => order.id !== currentOrderId));
    setShowModal(false);
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="bg-gray-100 p-4 flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Verify Payments</h2>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed">
          <thead>
            <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
              <th className="p-4 text-left">Sr No</th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer Name</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-5 border-b">{order.srNo}</td>
                <td className="px-4 py-5 border-b">{order.id}</td>
                <td className="px-4 py-5 border-b">{order.customerName}</td>
                <td className="px-4 py-5 border-b">
                  <button
                    onClick={() => handleAccept(order.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(order.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mr-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDownload(order.image)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Download Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
