import React, { useState, useEffect } from "react";

function ProductModal({ categories, showModal, setShowModal, addProduct, productToEdit, handleProductUpdate }) {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    image: "",
    shortDescription: "",
    additionalInformation: "",
    status: "",
    options: [""],
    color: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit); 
    } else {
      setFormData({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        image: "",
        shortDescription: "",
        additionalInformation: "",
        status: "",
        options: [""],
        color: "",
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      handleProductUpdate(formData); 
    } else {
      addProduct(formData);
    }
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/2 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-5xl"
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-semibold mb-4">{productToEdit ? "Edit Product" : "Add Product"}</h2>
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
                    <option key={category.id} value={category.name}>
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
                ></textarea>
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
                ></textarea>
              </div>
              <div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Colors (comma-separated)"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Options</h3>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
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
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {productToEdit ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default ProductModal;
