import { Apis } from "../../../lib/Apis";

export const featuredProductHook = () => {
    const getAllProducts = async (setProductsData, productId) => {
        try {
            const respsone = await Apis.getUnlinkedProducts(productId);
            setProductsData(respsone.data.data);
            return respsone.data.data
        } catch (error) {
            console.log(error);
            return error
        }
    }
    const addFeaturedProduct = async (data) => {
        try {
            const respsone = await Apis.addFeaturedProduct(data);
            return respsone.data
        } catch (error) {
            console.log(error);
        }
    }
    const getRelation = async (id, setFeaturedProductsRelationsData) => {
        try {
            const respsone = await Apis.getFeaturedProductsRelations(id);
            setFeaturedProductsRelationsData(respsone.data.data);
            console.log(respsone.data.data)
            return respsone.data.data
        } catch (error) {
            console.log(error);
            return error
        }
    }
    const deleteLinkedProduct = async (id) => {
        try {
            const respsone = await Apis.deleteLinkedProduct(id);
            return respsone.data
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getAllProducts,
        addFeaturedProduct,
        getRelation,
        deleteLinkedProduct
    }
}
