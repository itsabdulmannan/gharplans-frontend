import { Apis } from "../../../lib/Apis";

export const productsHook = () => {
    const getProductById = async (id) => {
        try {
            const response = await Apis.getProductById(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { getProductById };
};
