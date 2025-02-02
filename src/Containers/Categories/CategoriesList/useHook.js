import { useState } from "react";
import { Apis } from "../../../lib/Apis";

export const useCategory = () => {
  const [loading, setLoading] = useState(false);

  const addCategory = async (categoryData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("status", categoryData.status);

      if (categoryData.image) {
        formData.append("image", categoryData.image);
      }

      const response = await Apis.addCategory(formData);
      if (response?.status === 201) {
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Failed to add category.");
      }
    } catch (error) {
      throw new Error(error.message || "Error adding category.");
    } finally {
      setLoading(false);
    }
  };
  const editCategory = async (id, categoryData) => {
    try {
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("status", categoryData.status);

      if (categoryData.image instanceof File) {
        formData.append("image", categoryData.image);
      }

      for (const [key, value] of formData.entries()) {
        console.log(`FormData Key: ${key}, Value:`, value);
      }

      console.log("Final FormData Object:", formData);

      const response = await Apis.updateCategoryData(id, formData);
      if (response?.status === 200) {
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Failed to edit category.");
      }
    } catch (error) {
      throw new Error(error.message || "Error editing category.");
    }
  };
  const getCategories = async (setCategories) => {
    setLoading(true);
    try {
      const response = await Apis.getCategories();
      if (response?.status === 200) {
        setCategories(response.data.categories);
        return response;
      } else {
        throw new Error(response?.data?.message || "Failed to fetch categories.");
      }
    } catch (error) {
      alert(error.message || "Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };
  const updateCategoryStatus = async (id, status) => {
    try {
      setLoading(true);
      const data = { id, status };
      const response = await Apis.updateCategoryStatus(id, data);
      if (response?.status === 200) {
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Failed to update category status.");
      }
    } catch (error) {
      throw new Error(error.message || "Error updating category status.");
    } finally {
      setLoading(false);
    }
  };
  return {
    addCategory,
    editCategory,
    loading,
    getCategories,
    updateCategoryStatus,
  };
};
