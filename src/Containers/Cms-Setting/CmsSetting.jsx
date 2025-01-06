import React, { useState } from "react";
import {
  FaCoins,
  FaMobileAlt,
  FaUtensils,
  FaFileAlt,
  FaClipboardList,
  FaQuestionCircle,
} from "react-icons/fa";

function CmsSetting() {
  const [activeSetting, setActiveSetting] = useState();

  const settings = [
    {
      label: "Terms & Conditions",
      icon: <FaClipboardList size={24} />,
      link: "#",
    },
    {
      label: "Privacy Policy",
      icon: <FaFileAlt size={24} />,
      link: "#",
    },
    {
      label: "FAQ's Management",
      icon: <FaQuestionCircle size={24} />,
      link: "#",
    },
  ];

  const handleItemClick = (label) => {
    setActiveSetting(label);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CMS Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        {settings.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              activeSetting === item.label
                ? "bg-primary-dark text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleItemClick(item.label)}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
              {item.icon}
            </div>
            <div className="ml-4">
              <p className="font-medium">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CmsSetting;
