import Swal from 'sweetalert2'
import { Apis } from '../../../lib/Apis'

export const useDiscountTier = () => {
    const getDiscountTier = async (productId, setDiscountTiers) => {
        try {
            const response = await Apis.getDiscountedProducts(productId)
            setDiscountTiers(response.data.data)
            return response
        } catch (error) {
            return error
        }
    }
    const addDiscountTier = async (productId, newDiscount) => {
        try {
            const payload = {
                productId,
                discountTiers: [newDiscount]
            };

            const response = await Apis.addDiscountedProducts(payload);

            return response.data.data.discountTiers;
        } catch (error) {
            return error;
        }
    };
    const delteDiscountTier = async (productId, discountTierId) => {
        try {
            const response = await Apis.deleteDiscountedProducts(productId, discountTierId);
            return response;
        } catch (error) {
            return error;
        }
    }
    const showOnHomeScreen = async (productId, homePage) => {
        try {
            const body = {
                productId,
                homePage: homePage === 1 ? 0 : 1,
            };
            const response = await Apis.showOnHomeScreen(body);

            if (response?.message === "Success") {
                Swal.fire({
                    title: "Success!",
                    text: `The product has been successfully ${homePage === 1 ? "removed from" : "added to"} the home screen.`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }

            return response;
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "There was an issue updating the product on the home screen.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return error;
        }
    };
    const getProductData = async (productId, setProductData) => {
        try {
            const response = await Apis.getProductById(productId);
            setProductData(response.data);
            console.log(response.data);
            return response.data.homeScreen;
        } catch (error) {
            return error;
        }
    }
    const addStock = async (productId, stock) => {
        try {
            const payload = {
                productId,
                stock
            }
            const response = await Apis.addStock(payload);
            if (response?.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Stock has been added successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            return response
        } catch (error) {
            return error
        }
    }
    return { getDiscountTier, addDiscountTier, delteDiscountTier, showOnHomeScreen, getProductData, addStock };
}