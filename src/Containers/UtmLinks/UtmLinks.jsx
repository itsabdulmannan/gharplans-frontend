import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UtmModal from "../../Components/Modals/UtmLinks/UtmLinks";
import { useUtm } from "./useHook";

function UtmLinks() {
  const { getUtmLinks, addUtm, updateUtmStatus } = useUtm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmLinks, setUtmLinks] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchUtmLinks = async () => {
    await getUtmLinks(setUtmLinks);
  };

  useEffect(() => {
    fetchUtmLinks();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await updateUtmStatus(id, newStatus);
      if (response) {
        setUtmLinks((prev) =>
          prev.map((utm) =>
            utm.id === id ? { ...utm, status: newStatus } : utm
          )
        );

        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: "The UTM link status has been successfully updated!",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Status",
        text: "There was an error updating the UTM link status. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Failed to update UTM link status:", error);
    }
  };

  const handleAddUtmLink = async (newUtm) => {
    try {
      const response = await addUtm(newUtm);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "UTM Link Added",
          text: "Your UTM link has been successfully added!",
          confirmButtonText: "OK",
        });
        await fetchUtmLinks(); // Refresh the table by fetching the data again
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add UTM Link",
        text: "An error occurred while adding the UTM link. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Failed to add UTM link:", error);
    }
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
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
                    <th className="p-4 text-left">Sr. No</th>
                    <th className="p-4 text-left">Base Url</th>
                    <th className="p-4 text-left">Source</th>
                    <th className="p-4 text-left">Medium</th>
                    <th className="p-4 text-left">Campaign</th>
                    <th className="p-4 text-left">Status</th>
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
                      <td className="px-6 py-4">
                        <div
                          className={`relative inline-block w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
                            utm.status ? "bg-primary-dark" : "bg-[#cccccc]"
                          }`}
                          onClick={() => handleToggleStatus(utm.id, utm.status)}
                        >
                          <div
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                              utm.status ? "translate-x-8" : ""
                            }`}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <UtmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddUtmLink}
      />
    </>
  );
}

export default UtmLinks;
