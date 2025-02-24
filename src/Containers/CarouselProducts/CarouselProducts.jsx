import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
import { useBannerHook } from "./useHook";

function BannerManagement() {
  const { getBanners, addBanner, updateBanner, deleteBanner } = useBannerHook();

  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Form data for creating or editing a banner
  const [formData, setFormData] = useState({
    file: null, // file input
    title: "",
    description: "",
    link: "",
    status: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      await getBanners(setBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const openModal = (index = null) => {
    if (index !== null && banners[index]) {
      const bannerToEdit = banners[index];
      setFormData({
        // file is not stored; keep null unless user selects a new file
        file: null,
        title: bannerToEdit.title,
        description: bannerToEdit.description,
        link: bannerToEdit.link,
        status: bannerToEdit.status,
      });
      setEditIndex(index);
    } else {
      // Adding a new banner
      setFormData({
        file: null,
        title: "",
        description: "",
        link: "",
        status: true,
      });
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const handleAddBanner = async () => {
    // Basic validation: make sure required fields have values
    if (!formData.file || !formData.title || !formData.description || !formData.link) {
      Swal.fire("Error!", "Please fill in all required fields (including image).", "error");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("image", formData.file);
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("link", formData.link);
      fd.append("status", formData.status);

      await addBanner(fd);
      Swal.fire("Success!", "Banner added successfully.", "success");
      await fetchBanners();
      closeModal();
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleUpdateBanner = async () => {
    if (!formData.title || !formData.description || !formData.link) {
      Swal.fire("Error!", "Please fill in all required fields.", "error");
      return;
    }
    try {
      const bannerId = banners[editIndex].id;
      const fd = new FormData();
      if (formData.file) {
        fd.append("image", formData.file);
      }
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("link", formData.link);
      fd.append("status", formData.status);

      await updateBanner(bannerId, fd);
      Swal.fire("Success!", "Banner updated successfully.", "success");
      await fetchBanners();
      closeModal();
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleDeleteBanner = (index) => {
    const bannerId = banners[index].id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBanner(bannerId);
          Swal.fire("Deleted!", "Banner has been deleted.", "success");
          await fetchBanners();
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Banners</h2>

      {/* Display existing banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners?.map((banner, index) => (
          <div key={banner.id || index} className="bg-white rounded-lg shadow overflow-hidden">
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-gray-600 mt-2">{banner.description}</p>
              <a
                className="text-blue-500 text-sm mt-2 inline-block"
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Link
              </a>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => openModal(index)}
                >
                  <MdEdit className="mr-1" /> Edit
                </button>
                <button
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteBanner(index)}
                >
                  <MdDelete className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to open modal for adding a new banner */}
      <div className="mt-6 text-center">
        <button
          className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600"
          onClick={() => openModal(null)}
        >
          Add Banner
        </button>
      </div>

      {/* Modal for adding or editing a banner */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Banner" : "Add Banner"}
            </h2>

            {/* File input for the banner image */}
            <label className="block mb-2 font-semibold">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
              className="w-full mb-4 p-2 border rounded"
            />

            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter banner title"
            />

            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter banner description"
            />

            <label className="block mb-2 font-semibold">Link</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter link for the banner"
            />

            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
              />
              Active
            </label>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              {editIndex !== null ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleUpdateBanner}
                >
                  Update
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleAddBanner}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerManagement;
