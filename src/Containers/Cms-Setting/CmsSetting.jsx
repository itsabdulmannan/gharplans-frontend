import React, { useState } from "react";
import {
  FaClipboardList,
  FaFileAlt,
  FaQuestionCircle,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

import ModalTermsAndConditions from "../../Components/Modals/TermsAndConditions/TermsAndCondition";
import ModalPrivacyPolicy from "../../Components/Modals/PrivacyAndPolicy/PrivacyAndPolicy";
import ModalFaqManagement from "../../Components/Modals/Faq/Faq";
import ModalAddCities from "../../Components/Modals/Cities/City";

function CmsSetting() {
  const [activeSetting, setActiveSetting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [settingsContent, setSettingsContent] = useState({
    "Terms & Conditions": "Here are the Terms & Conditions content.",
    "Privacy Policy": "Here is the Privacy Policy content.",
    "FAQ's Management": "Manage your FAQ's here.",
    "Add Cities": "Here you can add new cities.",
  });

  const handleItemClick = (label) => {
    setActiveSetting(label);
  };

  const getActiveContent = () => {
    return settingsContent[activeSetting];
  };

  const openModal = (setting) => {
    setModalData(setting);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleSave = (data) => {
    setSettingsContent((prevContent) => ({
      ...prevContent,
      [activeSetting]: data, // Update the content for the active setting
    }));
    closeModal();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CMS Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(settingsContent).map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              activeSetting === item
                ? "bg-primary-dark text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
              {item === "Terms & Conditions" && <FaClipboardList size={24} />}
              {item === "Privacy Policy" && <FaFileAlt size={24} />}
              {item === "FAQ's Management" && <FaQuestionCircle size={24} />}
              {item === "Add Cities" && <FaQuestionCircle size={24} />}
            </div>
            <div className="ml-4">
              <p className="font-medium">{item}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {activeSetting && (
          <>
            <div className="flex justify-end">
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
                onClick={() =>
                  openModal({
                    label: activeSetting,
                    content: getActiveContent(),
                  })
                }
              >
                <FaPlus size={16} className="mr-2" />
                Add
              </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{activeSetting}</h3>
                <button
                  className="text-sm text-blue-600 flex items-center"
                  onClick={() =>
                    openModal({
                      label: activeSetting,
                      content: getActiveContent(),
                    })
                  }
                >
                  <FaEdit size={16} className="mr-1" />
                  Edit
                </button>
              </div>
              <p className="mt-4">{getActiveContent()}</p>
            </div>
          </>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {activeSetting === "Terms & Conditions" && (
        <ModalTermsAndConditions
          show={showModal}
          close={closeModal}
          settingData={modalData}
          handleSave={handleSave}
        />
      )}
      {activeSetting === "Privacy Policy" && (
        <ModalPrivacyPolicy
          show={showModal}
          close={closeModal}
          settingData={modalData}
          handleSave={handleSave}
        />
      )}
      {activeSetting === "FAQ's Management" && (
        <ModalFaqManagement
          show={showModal}
          close={closeModal}
          settingData={modalData}
          handleSave={handleSave}
        />
      )}
      {activeSetting === "Add Cities" && (
        <ModalAddCities
          show={showModal}
          close={closeModal}
          settingData={modalData}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}

export default CmsSetting;
