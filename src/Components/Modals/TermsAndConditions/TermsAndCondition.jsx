import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ModalTermsAndConditions({ show, close, handleSave, settingData }) {
  const [content, setContent] = useState(
    settingData ? settingData.content : ""
  );

  useEffect(() => {
    if (!show) {
      setContent(settingData ? settingData.content : "");
    }
  }, [show, settingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(content, settingData?.isNew, settingData?.id);
    close();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2 max-h-[80vh] relative overflow-hidden">
        <button className="absolute top-4 right-4 text-black" onClick={close}>
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold mt-2">
          {settingData?.isNew
            ? "Add Terms & Conditions"
            : "Edit Terms & Conditions"}
        </h3>

        <form onSubmit={handleSubmit} className="h-full">
          <div className="mt-4">
            <label className="block">Title</label>
            <input
              type="text"
              value="Heading 1"
              className="w-full border px-3 py-2 mt-2 rounded-md"
              readOnly
            />
          </div>

          <div className="mt-4 max-h-[400px] overflow-y-auto">
            <label className="block">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              className="w-full border px-3 py-2 mt-2 rounded-md"
            />
          </div>

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

export default ModalTermsAndConditions;
