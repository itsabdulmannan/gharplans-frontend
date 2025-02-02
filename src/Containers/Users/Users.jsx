import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../Components/Data/MockData";
import { useUser } from "./useHook";
import Swal from "sweetalert2";

function Users() {
  const { getAllUsers, updateUserStatus, searchUsers } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [usersData, setUsersData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery, statusFilter);
      setUsersData(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error("Error in search:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue with the search.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("");
    setFilteredUsers(usersData);
    getAllUsers(setUsersData);
  };

  useEffect(() => {
    getAllUsers(setUsersData);
  }, []);

  const handleShowDetails = (user) => {
    navigate("/users/view", { state: user });
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await updateUserStatus(id, newStatus);

      if (response) {
        setUsersData((prevUser) =>
          prevUser.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );

        Swal.fire({
          title: "Success",
          text: `User status has been ${
            newStatus ? "activated" : "deactivated"
          } successfully!`,
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update user status.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      <div className="mt-4">
        <div className="bg-white p-4 rounded-md shadow-md mb-6 flex gap-4 mt-4">
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
            <option value="" className="opacity-25">
              Select Status
            </option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            className="w-full sm:w-[45%] md:w-60 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="w-full sm:w-[45%] md:w-60 bg-primary-dark text-white px-4 py-2 rounded-md"
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
              {usersData.map((user, index) => (
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
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                        user.status ? "bg-primary-dark" : "bg-[#cccccc]"
                      }`}
                      onClick={() => handleToggleStatus(user.id, user.status)}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                          user.status ? "translate-x-8" : ""
                        }`}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center hover:bg-blue-600"
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
