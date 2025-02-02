import { Apis } from "../../lib/Apis";

export const useDeliveryCharges = () => {
    const getCities = async (setCities) => {
        try {
            const response = await Apis.getCities();
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getProducts = async (setProducts) => {
        try {
            const response = await Apis.getProducts();
            if (response && response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error(error);
            setProducts([]);
        }
    };
    const addProductDeliveryCharges = async (data) => {
        try {
            const response = await Apis.addProductDeliveryCharges(data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    const getProductDeliveryCharges = async (setDeliveryCharges) => {
        try {
            const response = await Apis.getProductsDeliveryCharges();
            setDeliveryCharges(response.data.data);
            return response.data
        } catch (error) {
            console.error(error);
            setDeliveryCharges([]);
        }
    };
    const deleteProductDeliveryCharges = async (id) => {
        try {
            const response = await Apis.deleteProductDeliveryCharges(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    const editProductDeliveryCharges = async (id, data) => {
        try {
            const response = await Apis.updateProductDeliveryCharges(id, data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    return { getCities, getProducts, getProductDeliveryCharges, addProductDeliveryCharges, deleteProductDeliveryCharges, editProductDeliveryCharges };
}