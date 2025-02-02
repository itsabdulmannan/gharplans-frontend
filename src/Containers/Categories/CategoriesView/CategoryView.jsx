import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { useCategoryProducts } from "./useHook";

function CategoryView() {
  const navigate = useNavigate();
  const { getCategoryProducts } = useCategoryProducts();
  const [products, setCategoryProducts] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      getCategoryProducts(id, setCategoryProducts);
    }
  }, [id]);

  const handlePageView = (productId) => {
    navigate("/category/view/products", { state: { productId } });
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Category Products</h2>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Sr. No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Color
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors duration-300`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={product?.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-full shadow-lg"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${product.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      product.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {product.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product?.color?.primary}
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    onClick={() => handlePageView(product.id)}
                  >
                    <IoEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryView;
