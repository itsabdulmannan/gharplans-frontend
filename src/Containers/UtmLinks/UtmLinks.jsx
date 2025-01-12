import React, { useState } from "react";
import UtmModal from "../../Components/Modals/UtmLinks/UtmLinks";
import { utmLink } from "../../Components/Data/MockData";

function UtmLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmLinks, setUtmLinks] = useState(utmLink);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id) => {
    setUtmLinks((prev) => prev.filter((utm) => utm.id !== id));
  };

  const handleAddUtmLink = (newUtm) => {
    setUtmLinks((prev) => [...prev, { ...newUtm, id: prev.length + 1 }]);
    closeModal();
  };

  return (
    <>
      <div>
        <div className="bg-gray-100 p-4 flex justify-between">
          <h2 className="text-2xl font-bold">Manage UTM</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={openModal}
          >
            Add UTM Link
          </button>
        </div>

        <div className="mt-4">
          <div className="bg-gray-100">
            {/* Table */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
                    <th className="p-4 text-left">Sr. No</th>
                    <th className="p-4 text-left">Base Url</th>
                    <th className="p-4 text-left">Source</th>
                    <th className="p-4 text-left">Medium</th>
                    <th className="p-4 text-left">Campaign</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {utmLinks.map((utm, index) => (
                    <tr
                      key={utm.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{utm.baseUrl}</td>
                      <td className="p-4">{utm.source}</td>
                      <td className="p-4">{utm.medium}</td>
                      <td className="p-4">{utm.campaign}</td>
                      <td className="p-4">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                          onClick={() => handleDelete(utm.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <UtmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddUtmLink}
      />
    </>
  );
}

export default UtmLinks;
