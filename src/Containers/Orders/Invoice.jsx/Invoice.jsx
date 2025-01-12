import React from "react";
import { mockedInvoiceProducts } from "../../../Components/Data/MockData";

const Invoice = () => {
  const products = mockedInvoiceProducts;

  const total = products.reduce(
    (sum, product) =>
      sum + product.quantity * product.price * product.rate,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 p-10 print:p-0 print:bg-white">
      <div className="bg-white p-8 shadow-md rounded-lg mx-auto print:shadow-none print:rounded-none">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-700">INVOICE</h1>
            <p className="text-gray-500">ORD-SWB10J-20241227</p>
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
            <p className="text-gray-700">Name: Customer Name</p>
            <p className="text-gray-500">Address: 123 Main St, Suite 100</p>
            <p className="text-gray-500">Phone: +92 123 456789</p>
          </div>
          <div>
            <div className="text-right">
              <h2 className="font-semibold text-lg">Date:</h2>
              <p className="text-gray-500">Date: Dec 15, 2024</p>
              <p className="text-gray-500">Time: 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Sr. No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Discount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Rate
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.discount}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(product.price * product.rate).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(product.quantity * product.price * product.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end mt-6">
          <div>
            <p className="text-lg font-semibold text-green-700">Total</p>
            <p className="text-2xl font-bold text-green-700">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
