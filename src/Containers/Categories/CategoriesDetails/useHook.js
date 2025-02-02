import { Apis } from "../../../lib/Apis";

export const useProductDetails = () => {
    const getProductDetails = async (id, setProductDetails) => {
        try {
            const response = await Apis.getProductDetails(id);
            setProductDetails(response.data);
            return response;
        } catch (error) {
            console.error("Error fetching product details: ", error);
            return error;
        }
    }
    return { getProductDetails };
};