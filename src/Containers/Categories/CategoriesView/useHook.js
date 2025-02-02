import { Apis } from "../../../lib/Apis";

export const useCategoryProducts = () => {
    const getCategoryProducts = async (id, setCategoryProducts) => {
        try {
            const response = await Apis.getCategoryProducts(id);
            if (response && response.data && Array.isArray(response.data.products)) {
                setCategoryProducts(response.data.products);
            } else {
                console.error("Invalid response format:", response);
                setCategoryProducts([]);
            }
        } catch (error) {
            console.error("Error in Hook:", error.message || error);
            setCategoryProducts([]);
        }
    };
    return { getCategoryProducts };
};
