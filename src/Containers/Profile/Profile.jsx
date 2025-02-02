import React, { useEffect, useState } from "react";
import image from "../../assets/user-image.png";
import { useProfile } from "./useHook";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserInfo = () => {
  const { getProfile, updatePassword } = useProfile();
  const [getUserData, setUserData] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for toggling password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    getProfile(setUserData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const body = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await updatePassword(body);

      if (response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Your password has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Failed to update password.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-gray-100 p-5">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg max-w-8xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-600"
              src={getUserData?.profileImage || image}
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {getUserData?.firstName} {getUserData?.lastName}
            </h2>
            <p className="text-gray-600 text-lg">
              {getUserData?.profession || "Software Engineer"}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                Email:{" "}
                <span className="text-indigo-600">{getUserData?.email}</span>
              </p>
              <p className="text-gray-700">
                Phone:{" "}
                <span className="text-indigo-600">
                  {getUserData?.contactNo}
                </span>
              </p>
              <p className="text-gray-700">
                User Role:{" "}
                <span className="text-indigo-600">{getUserData?.role}</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-medium"
            >
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter current password"
              required
            />
            <div
              className="absolute top-10 text-xl right-3 cursor-pointer text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter new password"
              required
            />
            <div
              className="absolute top-10 text-xl right-3 cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
              required
            />
            <div
              className="absolute top-10 text-xl right-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
