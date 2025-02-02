import { Apis } from "../../lib/Apis";

export const useQuotation = () => {
    const getProducts = async (setProductList) => {
        try {
            const response = await Apis.getProducts();
            setProductList(response.data.products);
        } catch (error) {
            console.error(error);
        }
    }
    const generatePdf = async (data, setPdfFileLink) => {
        try {
            const response = await Apis.generatePdf(data, setPdfFileLink);
            setPdfFileLink(response.data.fileUrl);
            console.log(response.data.fileUrl);
            return response.data.fileUrl;
        } catch (error) {
            console.error(error);
        }
    }
    return {
        getProducts,
        generatePdf,
    }
}