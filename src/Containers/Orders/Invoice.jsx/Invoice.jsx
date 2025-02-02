import React, { useEffect, useState } from "react";
import { useOrders } from "./useHook";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const { getOrderByOrderId } = useOrders();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderId) {
      getOrderByOrderId(orderId, setOrderData);
    }
  }, [orderId]);

  const products = orderData?.productInfo || [];

  const calculateDiscountedRate = (product) => {
    const price = parseFloat(product.singleProductprice);
    const quantity = product.quantity;
    let totalPrice = price * quantity;
    let discount = product.discount ? parseFloat(product.discount) : 0;
    let discountedAmount = totalPrice * (discount / 100);
    return totalPrice - discountedAmount;
  };

  const totalAmount = products.reduce(
    (sum, product) => sum + calculateDiscountedRate(product),
    0
  );

  const createdAt = new Date(orderData?.createdAt);
  const formattedDate = createdAt
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");
  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handlePrint = () => {
    window.print();
  };
  

  return (
    <div className="bg-gray-50 p-10 print:p-0 print:bg-white">
      <div className="bg-white p-8 shadow-md rounded-lg mx-auto print:shadow-none print:rounded-none">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-700">INVOICE</h1>
            <p className="text-gray-500">{orderData?.orderId}</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 print:hidden"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-green-700">GharPlans</h1>
        </div>
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="font-semibold text-lg">Bill From:</h2>
            <p className="text-gray-700">Address: 469 G1 Johar Town Lahore</p>
            <p className="text-gray-700">Phone: +92 339 5111199</p>
            <p className="text-gray-500">Email: info@gharplans.com</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Bill To:</h2>
            <p className="text-gray-700">
              Name: {orderData?.user?.firstName} {orderData?.user?.lastName}
            </p>
            <p className="text-gray-500">Email: {orderData?.user?.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Date:</h2>
            <p className="text-gray-500">{formattedDate}</p>
            <p className="text-gray-500">{formattedTime}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Sr. No</th>
                <th className="border px-4 py-2 text-left">Product Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Discount</th>
                <th className="border px-4 py-2 text-left">Rate</th>
                <th className="border px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const discountedRate = calculateDiscountedRate(product);
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">
                      {product.description || "No description available"}
                    </td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">
                      {parseFloat(product.singleProductprice).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {product.discount ? `{product.discount}%` : "0%"}
                    </td>
                    <td className="border px-4 py-2">
                      {discountedRate.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {discountedRate.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <div>
            <p className="text-lg font-semibold text-green-700">Sub Total</p>
            <p className="text-2xl font-bold text-green-700">
              {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
