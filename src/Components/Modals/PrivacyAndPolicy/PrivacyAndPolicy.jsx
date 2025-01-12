import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

function ModalPrivacyPolicy({ show, close, handleSave, settingData }) {
  const [content, setContent] = useState(settingData ? settingData.content : "");

  // Reset content when the modal is closed
  useEffect(() => {
    if (!show) {
      setContent(settingData ? settingData.content : "");
    }
  }, [show, settingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(content); // Handle the saving logic
    close();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2 max-h-[80vh] relative overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black"
          onClick={close}
        >
            <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold mt-2">Edit Privacy Policy</h3>

        <form onSubmit={handleSubmit} className="h-full">
          {/* Title Input */}
          <div className="mt-4">
            <label className="block">Title</label>
            <input
              type="text"
              value="Privacy Policy"
              className="w-full border px-3 py-2 mt-2 rounded-md"
              readOnly
            />
          </div>

          {/* Content Textarea */}
          <div className="mt-4 max-h-[400px] overflow-y-auto">
            <label className="block">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-3 py-2 mt-2 rounded-md"
              rows="8"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPrivacyPolicy;
