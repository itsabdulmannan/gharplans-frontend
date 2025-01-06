import React, { useState } from "react";
import { IoEye } from "react-icons/io5";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "user1.jpg", // Assuming image paths
    address: "123 Main St, City, Country",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "user2.jpg",
    address: "456 Elm St, Town, Country",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    image: "user3.jpg",
    address: "789 Oak St, Village, Country",
    status: "Active",
  },
];

function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = () => {
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter ? user.status === statusFilter : true)
    );
    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("");
    setFilteredUsers(mockUsers);
  };

  const handleShowDetails = (user) => {
    alert(
      `User Details:\nName: ${user.name}\nEmail: ${user.email}\nAddress: ${user.address}`
    );
  };

  const handleToggleStatus = (id) => {
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      <div className="mt-4">
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            className="w-[40%] flex-grow px-4 py-2 border rounded-lg"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-[20%] px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            className="w-[20%] bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="w-[20%] bg-gray-300 text-black py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-gray-200 transition-colors duration-300`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-14 h-14 object-cover rounded-full shadow-lg"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                        user.status === "Active" ? "bg-primary-dark" : "bg-[#cccccc]"
                      }`}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                          user.status === "Active" ? "translate-x-8" : ""
                        }`}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                      onClick={() => handleShowDetails(user)}
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
    </div>
  );
}

export default Users;
