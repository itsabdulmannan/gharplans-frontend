import { Apis } from "../../lib/Apis";

export const useCarouselHook = () => {
    const addCarouselItems = async (data) => {
        try {
            const response = await Apis.addCarouselItems(data);
            return response;
        } catch (error) {
            return error;
        }
    };
    const getCarouselItems = async (setCarouselProducts) => {
        try {
            const response = await Apis.getCarouselItems();
            setCarouselProducts(response.data.data);
            return response;
        } catch (error) {
            return error;
        }
    };
    const updateCarouselItems = async (data) => {
        try {
            console.log(data);
            const response = await Apis.updateCarouselItems(data);
            return response;
        } catch (error) {
            return error;
        }
    };
    const getAllProducts = async (setProducts) => {
        try {
            const response = await Apis.getProducts();
            if (response && response.data) {
                setProducts(response.data.products);
            }
        } catch (error) {
            return error;
        }
    };
    return {
        addCarouselItems,
        getCarouselItems,
        updateCarouselItems,
        getAllProducts,
    };
};
