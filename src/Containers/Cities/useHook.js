import { Apis } from "../../lib/Apis";

export const useCities = () => {
    const addCities = async (data) => {
        try {
            const response = await Apis.createCity(data);
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add city');
        }
    };
    const getCities = async (setCities) => {
        try {
            const response = await Apis.getCities();
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const deleteCity = async (id) => {
        try {
            const response = await Apis.deleteCity(id);
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete city');
        }
    };
    const updateCity = (id, data) => {
        try {
            console.log(id, data)
            const response = Apis.updateCityStatus(id, data);
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    return { addCities, getCities, updateCity, deleteCity };
}
