import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCities } from "./useHook";
import ModalAddCities from "../../Components/Modals/Cities/City";
import { MdDelete, MdEdit } from "react-icons/md";

function Cities() {
  const { addCities, getCities, deleteCity, updateCity } = useCities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [editCity, setEditCity] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditCity(null);
  };

  const fetchCities = async () => {
    await getCities(setCities);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddOrUpdateCity = async (cityName, cityId = null) => {
    try {
      if (cityId) {
        const response = await updateCity(cityId, { name: cityName }); // Pass data as { name: cityName }
        if (response) {
          Swal.fire({
            icon: "success",
            title: "City Updated",
            text: "Your city has been successfully updated!",
            confirmButtonText: "OK",
          });
        }
      } else {
        const response = await addCities({ name: cityName });
        if (response) {
          Swal.fire({
            icon: "success",
            title: "City Added",
            text: "Your city has been successfully added!",
            confirmButtonText: "OK",
          });
        }
      }
      await fetchCities();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Save City",
        text: "An error occurred while saving the city. Please try again.",
        confirmButtonText: "OK",
      });
    }
    closeModal();
  };

  const handleEditCity = (city) => {
    setEditCity(city);
    openModal();
  };

  const handleDeleteCity = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCity(id);
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The city has been deleted.",
            confirmButtonText: "OK",
          });
          await fetchCities();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Delete",
          text: "An error occurred while deleting the city. Please try again.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <>
      <div>
        <div className="bg-gray-100 p-4 flex justify-between">
          <h2 className="text-2xl font-bold">Manage Cities</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={openModal}
          >
            Add City
          </button>
        </div>

        <div className="mt-4">
          <div className="bg-gray-100">
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
                    <th className="p-4 text-left">Sr. No</th>
                    <th className="p-4 text-left">City Name</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city, index) => (
                    <tr
                      key={city.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{city.name}</td>
                      <td className="px-4 py-2 border-b">
                        <div className="flex gap-2">
                          <button
                            className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                            onClick={() => handleEditCity(city)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteCity(city.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                          >
                            <MdDelete />
                          </button>
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

      <ModalAddCities
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddOrUpdateCity}
        editCity={editCity}
      />
    </>
  );
}

export default Cities;
