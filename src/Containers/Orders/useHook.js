import { Apis } from "../../lib/Apis";

export const useOrders = () => {
    const getORders = async (setOrderData, param) => {
        const resposne = await Apis.getOrders(param);
        setOrderData(resposne.data.ordersData);
        return resposne;
    }
    return { getORders };
}