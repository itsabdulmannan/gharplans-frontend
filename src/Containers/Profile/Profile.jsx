import React, { useState } from "react";
import image from "../../assets/user-image.png";

const UserInfo = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Show the success modal
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 p-5">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg max-w-8xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-600"
              src={image}
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600 text-lg">Software Engineer</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                Email:{" "}
                <span className="text-indigo-600">johndoe@example.com</span>
              </p>
              <p className="text-gray-700">
                Phone: <span className="text-indigo-600">+1 234 567 890</span>
              </p>
              <p className="text-gray-700">
                User Role: <span className="text-indigo-600">Admin</span>
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
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-medium"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
              required
            />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Success!
            </h3>
            <p className="text-gray-700 mb-4">
              Your password has been updated successfully.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
