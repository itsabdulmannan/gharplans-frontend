import { Apis } from "../../../lib/Apis";

export const useOrderPayments = () => {
  const getPayment = async (status) => {
    try {
      const response = await Apis.getPayments(status);
      return response;
    } catch (error) {
      console.error("Error fetching payment data:", error);
      return error;
    }
  };

  const verifyPayment = async (id, status) => {
    try {
      const body = { paymentStatus: status };
      const response = await Apis.updatePaymentStatus(id, body);
      return response;
    } catch (error) {
      return error;
    }
  };

  return { verifyPayment, getPayment };
};
