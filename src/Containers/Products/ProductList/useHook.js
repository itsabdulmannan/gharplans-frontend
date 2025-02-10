import { useState } from "react";
import { Apis } from "../../../lib/Apis";
import axios from "axios";

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const getProducts = async (setProducts) => {
        try {
            const response = await Apis.getProducts();
            if (response && response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                console.error("Invalid response format:", response);
            }
        } catch (error) {
            console.error("Error in Hook:", error.message || error);
        }
    };
    const getCategories = async (setCategories) => {
        try {
            const response = await Apis.getCategories();
            if (
                response &&
                response.data &&
                Array.isArray(response.data.categories)
            ) {
                setCategories(response.data.categories);
            } else {
                console.error("Invalid response format:", response);
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error?.message || error);
            setCategories([]);
        }
    };
    const updateProductStatus = async (id, status) => {
        try {
            setLoading(true);
            const requestBody = {
                id,
                status,
            };
            const response = await Apis.updateProductStatus(requestBody);
            if (response && response.data) {
                return response;
            } else {
                console.error("Invalid response format:", response);
                return null;
            }
        } catch (error) {
            console.error("Error in Hook:", error.message || error);
            return null;
        } finally {
            setLoading(false);
        }
    };
    const deleteProduct = async (id) => {
        try {
            const response = await Apis.deletProduct(id);
            if (response && response.data) {
                return response;
            } else {
                console.error("Invalid response format:", response);
                return null;
            }
        } catch (error) {
            console.error("Error in Hook:", error.message || error);
            return null;
        }
    };
    const addProduct = async (formData) => {
        try {
            const response = await Apis.addProduct(formData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    return { getProducts, getCategories, updateProductStatus, deleteProduct, addProduct };
};

export default useProducts;