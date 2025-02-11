import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { useCarouselHook } from "./useHook";

function CarouselManagement() {
  const {
    addCarouselItems,
    getCarouselItems,
    updateCarouselItems,
    getAllProducts,
  } = useCarouselHook();

  const [carouselProducts, setCarouselProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchCarouselItems();
    getAllProducts(setProducts);
  }, []);

  const fetchCarouselItems = async () => {
    await getCarouselItems(setCarouselProducts);
  };

  const openModal = (index = null) => {
    if (index !== null) {
      setSelectedProduct(carouselProducts[index].id);
      setCurrentProductId(carouselProducts[index].id);
      setEditIndex(index);
    } else {
      setSelectedProduct("");
      setCurrentProductId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setCurrentProductId(null);
  };

  const addCarouselProduct = async () => {
    if (!selectedProduct) {
      Swal.fire("Error!", "Please select a product.", "error");
      return;
    }

    if (carouselProducts.length >= 3) {
      Swal.fire("Limit Reached", "Only 3 products can be added.", "warning");
      return;
    }

    await addCarouselItems({ productId: selectedProduct, homePage: 1 });
    await fetchCarouselItems();
    closeModal();
  };

  const updateCarouselProduct = async () => {
    if (!selectedProduct) {
      Swal.fire("Error!", "Please select a product.", "error");
      return;
    }

    await updateCarouselItems({
      currentProductId,
      newProductId: selectedProduct,
      homePage: 1,
    });
    await fetchCarouselItems();
    closeModal();
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-bold">Manage Carousel Products</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {carouselProducts?.map((product, index) => (
          <div key={index} className="p-2 border rounded shadow">
            <img
              src={product.colors?.[0]?.image || product.image}
              alt={product.name}
              className="h-24 w-full object-cover rounded"
            />
            <h3 className="text-sm font-semibold">{product.name}</h3>
            <div className="flex justify-between mt-2">
              <button
                className="text-blue-500 text-2xl border rounded p-1 hover:bg-blue-500 hover:text-white"
                onClick={() => openModal(index)}
              >
                <MdEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      {carouselProducts.length < 3 && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
          onClick={openModal}
        >
          Add to Carousel
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold">
              {editIndex !== null ? "Edit" : "Add"} Carousel Product
            </h2>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full mt-4 p-2 border rounded"
            >
              <option value="">Select a Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              {editIndex !== null ? (
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={updateCarouselProduct}
                >
                  Update
                </button>
              ) : (
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={addCarouselProduct}
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

export default CarouselManagement;
