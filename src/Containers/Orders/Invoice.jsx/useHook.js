import { Apis } from "../../../lib/Apis";

export const useOrders = () => {
    const getOrderByOrderId = async (orderId, setOrderData) => {
        try {
            const response = await Apis.getOrderByOrderId(orderId);
            setOrderData(response.data.orderData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };
    return { getOrderByOrderId };
}