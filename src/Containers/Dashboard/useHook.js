import { Apis } from "../../lib/Apis";

export const useDashboardStats = () => {
    const getStats = async (setStatsData) => {
        try {
            const resposne = await Apis.getStats();
            setStatsData(resposne.data.data);
            return resposne.data;
        } catch (error) {
            console.error("Error fetching stats:", error);
            return null;
        }
    }
    return { getStats };
}