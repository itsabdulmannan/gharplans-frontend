import React, { useState, useEffect } from "react";
import { FaClipboardList, FaFileAlt, FaQuestionCircle, FaPlus, FaEdit } from "react-icons/fa";
import { useHook } from "../../Containers/Cms-Setting/useHook";
import ModalTermsAndConditions from "../../Components/Modals/TermsAndConditions/TermsAndCondition";
import ModalPrivacyPolicy from "../../Components/Modals/PrivacyAndPolicy/PrivacyAndPolicy";
import ModalFaqManagement from "../../Components/Modals/Faq/Faq";

function CmsSetting() {
  const {
    getTermAndCondition,
    getPrivacyPolicy,
    getFaqManagement,
    addTermsAndConditions,
    addPrivacyPolicy,
    addFaqManagement,
    updateTermsAndConditions,
    updatePrivacyPolicy,
    updateFaqManagement,
  } = useHook();

  const [activeSetting, setActiveSetting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [settingsContent, setSettingsContent] = useState({
    "Terms & Conditions": "",
    "Privacy Policy": "",
    "FAQ's Management": "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await getTermAndCondition((data) => {
        setSettingsContent((prev) => ({ ...prev, "Terms & Conditions": data }));
      });
      await getPrivacyPolicy((data) => {
        setSettingsContent((prev) => ({ ...prev, "Privacy Policy": data }));
      });
      await getFaqManagement((data) => {
        setSettingsContent((prev) => ({ ...prev, "FAQ's Management": data }));
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getActiveContent = () => settingsContent[activeSetting];

  const openModal = (isNew = false, id = null) => {
    setModalData({
      label: activeSetting,
      content: isNew ? "" : getActiveContent(),
      isNew,
      id,  // Pass the ID for edit
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleSave = async (data, isNew, id) => {
    try {
      if (activeSetting === "Terms & Conditions") {
        isNew ? await addTermsAndConditions(data) : await updateTermsAndConditions(data, id);
      } else if (activeSetting === "Privacy Policy") {
        isNew ? await addPrivacyPolicy(data) : await updatePrivacyPolicy(data, id);
      } else if (activeSetting === "FAQ's Management") {
        isNew ? await addFaqManagement(data) : await updateFaqManagement(data, id);
      }
      setSettingsContent((prevContent) => ({
        ...prevContent,
        [activeSetting]: data,
      }));
      closeModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CMS Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(settingsContent).map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              activeSetting === item ? "bg-primary-dark text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSetting(item)}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
              {item === "Terms & Conditions" && <FaClipboardList size={24} />}
              {item === "Privacy Policy" && <FaFileAlt size={24} />}
              {item === "FAQ's Management" && <FaQuestionCircle size={24} />}
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
                onClick={() => openModal(true)} // Open modal for "Add"
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
                  onClick={() => openModal(false)} // Open modal for "Edit"
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
    </div>
  );
}

export default CmsSetting;
