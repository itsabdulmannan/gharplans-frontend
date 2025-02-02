import React, { useState, useEffect } from "react";
import { useProducts } from "../../../Containers/Products/ProductList/useHook";

function ProductModal({ categories, showModal, setShowModal, productToEdit }) {
  const { addProduct, updateProduct, loading, error } = useProducts();
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    shortDescription: "",
    additionalInformation: "",
    status: "",
    options: [""],
    colors: [],
  });
  const [colorImages, setColorImages] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        shortDescription: "",
        additionalInformation: "",
        status: "",
        options: [""],
        colors: [],
      });
      setColorImages({});
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (index, key, value) => {
    const updatedColors = [...formData.colors];
    if (!updatedColors[index]) updatedColors[index] = { name: "", images: [] };
    updatedColors[index] = { ...updatedColors[index], [key]: value };
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleColorImageChange = (index, files) => {
    if (files) {
      const updatedImages = { ...colorImages };
      updatedImages[index] = files;
      setColorImages(updatedImages);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { name: "", images: [] }],
    });
  };

  const removeColor = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index);
    const updatedImages = { ...colorImages };
    delete updatedImages[index];
    setFormData({ ...formData, colors: updatedColors });
    setColorImages(updatedImages);
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "colors") {
        formData.colors.forEach((color, index) => {
          data.append(`colors[${index}][name]`, color.name);
          if (colorImages[index]) {
            Array.from(colorImages[index]).forEach((file) => {
              data.append(`colors[${index}][images]`, file);
            });
          }
        });
      } else if (key === "options") {
        formData.options.forEach((option, index) => {
          data.append(`options[${index}]`, option);
        });
      } else {
        data.append(key, formData[key]);
      }
    });
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, data);
      } else {
        await addProduct(data);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/2 relative">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-5xl"
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-semibold mb-4">
            {productToEdit ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="col-span-2">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Short Description"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="col-span-2">
                <textarea
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleChange}
                  placeholder="Additional Information"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Product Weight"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Product Image With Color</h3>
                {formData.colors.map((color, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={color.name}
                        onChange={(e) =>
                          handleColorChange(index, "name", e.target.value)
                        }
                        placeholder={`Color ${index + 1}`}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                      />
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleColorImageChange(index, e.target.files)
                        }
                        className="w-full pt-1 ps-2 border border-gray-300 rounded h-10"
                        accept="image/*"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove Color
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Color
                </button>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Options</h3>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex flex-row items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Option
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading
                  ? "Processing..."
                  : productToEdit
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default ProductModal;
