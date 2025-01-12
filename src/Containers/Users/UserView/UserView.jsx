import React from "react";
import image from "../../../assets/user-image.png";

const UserInfo = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-600"
              src={image}
              alt="Profile"
            />
          </div>
          {/* User Information */}
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
                Location: <span className="text-indigo-600">New York, USA</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        <div className="flex items-center justify-between">
          {/* Account Stats */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Account Stats
            </h3>
            <div className="flex space-x-4 mt-4">
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-indigo-600">123</p>
              </div>
              <div>
                <p className="text-gray-600">Total Reviews</p>
                <p className="text-2xl font-semibold text-indigo-600">1.2k</p>
              </div>
              {/* <div>
                <p className="text-gray-600">Following</p>
                <p className="text-2xl font-semibold text-indigo-600">256</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
