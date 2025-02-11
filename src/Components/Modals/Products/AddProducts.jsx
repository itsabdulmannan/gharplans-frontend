import React, { useState, useEffect, useRef } from "react";
import { useProducts } from "../../../Containers/Products/ProductList/useHook";

// Helper function to validate image dimensions
const checkImageDimension = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      if (this.width === 450 && this.height === 450) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

function ProductModal({ categories, showModal, setShowModal, productToEdit }) {
  const { addProduct, updateProduct, loading, error } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- STEP 1: Add a new "currency" field to the initial formData ----
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    shortDescription: "",
    additionalInformation: "",
    status: "",
    weight: "",
    dimensions: [""],
    colors: [],
    currency: "", // <-- new field
  });

  const fileInputRefs = useRef([]);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        dimensions: productToEdit.dimensions || [""],
        colors: productToEdit.colors
          ? productToEdit.colors.map((color) => ({
              name: color.name || "",
              images: color.images || [],
            }))
          : [],
        // If the existing product has a "currency" value, set it here; otherwise, fallback
        currency: productToEdit.currency || "",
      });
    } else {
      setFormData({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        shortDescription: "",
        additionalInformation: "",
        status: "",
        weight: "",
        dimensions: [""],
        colors: [],
        currency: "", // default blank
      });
    }
  }, [productToEdit]);

  // Handle basic text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For color name
  const handleColorNameChange = (index, value) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[index].name = value;
      return { ...prev, colors: updatedColors };
    });
  };

  // Trigger hidden file input for a specific color
  const handleAddImageClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  // Validate each image as 450x450
  const handleColorImageChange = async (colorIndex, files) => {
    if (!files || files.length === 0) return;

    const validatedFiles = [];
    for (const file of Array.from(files)) {
      try {
        const isValid = await checkImageDimension(file);
        if (isValid) {
          validatedFiles.push(file);
        } else {
          alert(
            `Image "${file.name}" must be exactly 450x450. This file was skipped.`
          );
        }
      } catch (err) {
        console.error("Error loading file:", file.name, err);
      }
    }

    if (validatedFiles.length > 0) {
      setFormData((prev) => {
        const updatedColors = [...prev.colors];
        const existingImages = updatedColors[colorIndex].images || [];
        updatedColors[colorIndex].images = [...existingImages, ...validatedFiles];
        return { ...prev, colors: updatedColors };
      });
    }
  };

  // Remove a single file from a color's images
  const handleRemoveColorImage = (colorIndex, imageIndex) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[colorIndex].images.splice(imageIndex, 1);
      return { ...prev, colors: updatedColors };
    });
  };

  // Add/remove entire color rows
  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: "", images: [] }],
    }));
  };
  const removeColor = (index) => {
    setFormData((prev) => {
      const updatedColors = prev.colors.filter((_, i) => i !== index);
      return { ...prev, colors: updatedColors };
    });
  };

  // Dimensions array logic
  const handleDimensionChange = (index, value) => {
    setFormData((prev) => {
      const updatedDimensions = [...prev.dimensions];
      updatedDimensions[index] = value;
      return { ...prev, dimensions: updatedDimensions };
    });
  };
  const addDimension = () => {
    setFormData((prev) => ({
      ...prev,
      dimensions: [...prev.dimensions, ""],
    }));
  };
  const removeDimension = (index) => {
    setFormData((prev) => {
      const updatedDimensions = prev.dimensions.filter((_, i) => i !== index);
      return { ...prev, dimensions: updatedDimensions };
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "colors") {
        formData.colors.forEach((color, colorIndex) => {
          data.append(`colors[${colorIndex}][name]`, color.name);
          if (color.images && color.images.length) {
            color.images.forEach((file) => {
              data.append(`colors[${colorIndex}][images]`, file);
            });
          }
        });
      } else if (key === "dimensions") {
        formData.dimensions.forEach((dimVal, dimIndex) => {
          data.append(`dimensions[${dimIndex}]`, dimVal);
        });
      } else {
        // For everything else, including "currency", "categoryId", etc.
        data.append(key, formData[key]);
      }
    });

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, data);
      } else {
        await addProduct(data);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 relative max-h-[80vh] overflow-y-auto">
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
            {/* Category */}
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

            {/* Product Name */}
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

            {/* Description (full width) */}
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

            {/* Price */}
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

            {/* Short Description */}
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

            {/* Additional Information (full width) */}
            <div className="col-span-2">
              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                placeholder="Additional Information"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Status */}
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

            {/* Weight */}
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

            {/* --- NEW: CURRENCY Field --- */}
            <div>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                placeholder="Currency (e.g. USD)"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div></div> {/* Just to fill the 2-column gap. Delete or style as needed. */}

            {/* Colors & Images Section (full width) */}
            <div className="col-span-2">
              <h3 className="font-semibold mb-2">
                Product Images by Color (450×450 Only)
              </h3>
              {formData.colors.map((color, index) => (
                <div key={index} className="mb-4 border p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    {/* Color Name */}
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) =>
                        handleColorNameChange(index, e.target.value)
                      }
                      placeholder="Color Name (e.g. Red)"
                      className="w-1/3 p-2 border border-gray-300 rounded"
                    />

                    {/* Add Image (Plus Icon) */}
                    <button
                      type="button"
                      onClick={() => handleAddImageClick(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      + Add Image
                    </button>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      onChange={(e) =>
                        handleColorImageChange(index, e.target.files)
                      }
                    />

                    {/* Remove entire color */}
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove Color
                    </button>
                  </div>

                  {/* Display the chosen images for this color */}
                  {color.images && color.images.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-3">
                      {color.images.map((file, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="border rounded p-2 flex items-center"
                        >
                          {/* Optional Preview */}
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-16 h-16 object-cover mr-2"
                          />

                          <span className="mr-2 text-sm">{file.name}</span>
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() =>
                              handleRemoveColorImage(index, imgIndex)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addColor}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                + Add New Color
              </button>
            </div>

            {/* Dimensions Section (full width) */}
            <div className="col-span-2 mt-4">
              <h3 className="font-semibold mb-2">Dimensions</h3>
              {formData.dimensions.map((dimension, index) => (
                <div key={index} className="flex flex-row items-center mb-2">
                  <input
                    type="text"
                    value={dimension}
                    onChange={(e) =>
                      handleDimensionChange(index, e.target.value)
                    }
                    placeholder={`Dimension ${index + 1}`}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeDimension(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDimension}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Dimension
              </button>
            </div>
          </div>

          {/* Action Buttons */}
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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : productToEdit
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
