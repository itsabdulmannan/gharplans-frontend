import { data } from "react-router-dom";
import { Apis } from "../../lib/Apis";

export const useUtm = () => {
    const getUtmLinks = async (setUtmLinks) => {
        try {
            const response = await Apis.getUtmLinks();
            setUtmLinks(response.data.data);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            return [];
        }
    };
    const addUtm = async (data) => {
        try {
            const response = await Apis.createUtm(data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return [];
        }
    };
    const updateUtmStatus = async (id, status) => {
        try {
            const response = await Apis.updateUtmStatus(id, status);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw new Error("Failed to update UTM link status.");
        }
    };


    return {
        getUtmLinks,
        addUtm,
        updateUtmStatus
    };
}