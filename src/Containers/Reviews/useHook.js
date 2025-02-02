import { Apis } from '../../lib/Apis';

export const useReviews = () => {
    const getReviews = async (status, setReviewData) => {
        try {
            const response = await Apis.getReviews({ status });
            setReviewData(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const acceptReviews = async (body) => {
        try {
            const response = await Apis.acceptReviews(body);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    return { getReviews, acceptReviews };
};
