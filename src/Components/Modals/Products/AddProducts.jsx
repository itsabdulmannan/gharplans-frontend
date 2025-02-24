import React, { useState, useEffect, useRef } from "react";
import { useProducts } from "../../../Containers/Products/ProductList/useHook";
import { productsHook } from "./useHook";

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

const initialFormData = {
  categoryId: "",
  name: "",
  description: "",
  price: "",
  shortDescription: "",
  additionalInformation: "",
  status: "true",
  weight: "",
  unit: "",
  dimensions: "",
  colors: [],
  currency: "",
};

function ProductModal({
  categories,
  showModal,
  setShowModal,
  productToEdit,
  productId,
  onSuccess,
}) {
  const { getProductById } = productsHook();
  const { addProduct, updateProduct, loading, error } = useProducts();

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRefs = useRef([]);
  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (productId && !productToEdit) {
          const dataFromApi = await getProductById(productId);
          if (dataFromApi) {
            setFormData({
              ...dataFromApi,
              categoryId: dataFromApi.category?.categoryId || "",
              dimensions: dataFromApi.dimension || "",
              unit: dataFromApi.unit || "",
              colors: Array.isArray(dataFromApi.colors)
                ? dataFromApi.colors.map((color) => ({
                    name: color.color || "",
                    images: color.image || [],
                  }))
                : [],
              currency: dataFromApi.currency || "",
            });
          }
        } else if (productToEdit) {
          setFormData({
            ...productToEdit,
            categoryId: productToEdit.category?.categoryId || "",
            dimensions: productToEdit.dimension || "",
            unit: productToEdit.unit || "",
            colors: Array.isArray(productToEdit.colors)
              ? productToEdit.colors.map((color) => ({
                  name: color.color || "",
                  images: color.image || [],
                }))
              : [],
            currency: productToEdit.currency || "",
          });
        } else {
          setFormData(initialFormData);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    if (showModal) {
      loadProduct();
    }
  }, [showModal, productId, productToEdit]);

  const handleClose = () => {
    setFormData(initialFormData);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorNameChange = (index, value) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[index].name = value;
      return { ...prev, colors: updatedColors };
    });
  };

  const handleAddImageClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

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
        updatedColors[colorIndex].images = [
          ...existingImages,
          ...validatedFiles,
        ];
        return { ...prev, colors: updatedColors };
      });
    }
  };

  const handleRemoveColorImage = (colorIndex, imageIndex) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[colorIndex].images.splice(imageIndex, 1);
      return { ...prev, colors: updatedColors };
    });
  };

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

  const handleSubmit = async (e) => {
    console.log("Triggered");
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
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      if (productId || productToEdit) {
        const updateId = productId || productToEdit.id;
        await updateProduct(updateId, data);
      } else {
        await addProduct(data);
      }
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      handleClose();
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
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {productId || productToEdit ? "Edit Product" : "Add Product"}
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
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Categories Found</option>
                )}
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
            {/* Weight & Unit */}
            <div className="flex space-x-2">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Currency */}
            <div>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Currency</option>
                <option value="$">$</option>
                <option value="PKR">PKR</option>
              </select>
            </div>
            {/* Colors & Images Section */}
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
                    {/* Add Image */}
                    <button
                      type="button"
                      onClick={() => handleAddImageClick(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      + Add Image
                    </button>
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
                    {/* Remove Color */}
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove Color
                    </button>
                  </div>

                  {/* Display chosen images */}
                  {color.images && color.images.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-3">
                      {color.images.map((file, imgIndex) => {
                        const src =
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file);
                        const fileName =
                          typeof file === "string"
                            ? file.split("/").pop()
                            : file.name;
                        return (
                          <div
                            key={imgIndex}
                            className="border rounded p-2 flex items-center"
                          >
                            <img
                              src={src}
                              alt="preview"
                              className="w-16 h-16 object-cover mr-2"
                            />
                            <span className="mr-2 text-sm">{fileName}</span>
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
                        );
                      })}
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
            {/* Dimensions */}
            <div className="col-span-2 mt-4">
              <h3 className="font-semibold mb-2">Dimensions</h3>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="Dimensions (e.g. 10x10x10)"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleClose}
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
                : productId || productToEdit
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
