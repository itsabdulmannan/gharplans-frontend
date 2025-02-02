import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./useHook";

function Order() {
  const { getORders } = useOrders();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await getORders(setOrderData);
      setOrderData(response.data.ordersData);
      setFilteredData(response.data.ordersData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const params = {
        name: searchName,
        orderId: searchOrderId,
        status: searchStatus,
      };
      const response = await getORders(setOrderData, params);
      setFilteredData(response.data.ordersData);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handlePageView = (orderId) => {
    console.log(orderId);
    navigate(`/orders/invoice`, { state: { orderId } });
  };

  const handleVerifyPaymentPageView = () => {
    navigate(`/orders/verify-payment`);
  };

  const handleReset = () => {
    setSearchName("");
    setSearchOrderId("");
    setSearchStatus("");
    setFilteredData(orderData);
    fetchOrderData();
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleVerifyPaymentPageView}
        >
          Verify Payments
        </button>
      </div>

      <div className="mt-4">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-wrap gap-4 justify-center mt-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full sm:w-[45%] md:w-80 px-4 py-2 border rounded-lg"
          />
          {/* <input
            type="text"
            placeholder="Search by Order ID"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-full sm:w-[45%] md:w-80 px-4 py-2 border rounded-lg"
          /> */}
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="w-full sm:w-[45%] md:w-80 px-4 py-2 border rounded-lg"
          >
            <option value="">Search by Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={handleSearch}
            className="w-full sm:w-[45%] md:w-60 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-[45%] md:w-60 bg-primary-dark text-white px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="bg-gray-100">
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
                  <th className="p-4 text-left">Sr. No</th>
                  <th className="p-4 text-left">User Name</th>
                  <th className="p-4 text-left">No. of Items</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr
                      key={row.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        {row.user
                          ? `${row.user.firstName} ${row.user.lastName}`
                          : "User info not available"}
                      </td>
                      <td className="p-4">{row.totalItemsPurchased}</td>
                      <td className="p-4">{row.status}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handlePageView(row.orderId)}
                          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        >
                          <IoEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-500 italic"
                    >
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
