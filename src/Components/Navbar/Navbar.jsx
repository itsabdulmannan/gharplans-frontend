import React, { useState } from "react";
import { FaUser, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePageView = () => {
    setIsDropdownOpen(false); // Close dropdown when navigating
    navigate("/cms");
  };

  const handleProfileView = () => {
    setIsDropdownOpen(false); // Close dropdown when navigating
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsDropdownOpen(false); // Close dropdown when logging out
    navigate("/login");
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center bg-primary-dark text-white h-20 px-4 p-0">
      <div>
        <h1 className="text-3xl font-bold">Hello Admin</h1>
      </div>

      <div className="relative flex items-center gap-6 me-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-700" />
            </div>
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div>
            <h2 className="text-lg font-medium text-black">Admin</h2>
            <p className="text-l text-gray-900">admin</p>
          </div>
        </div>

        <FaChevronDown
          className={`text-black transform cursor-pointer ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          onClick={toggleMenu}
        />

        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
            style={{ top: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handlePageView}
                >
                  Setting
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleProfileView}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
