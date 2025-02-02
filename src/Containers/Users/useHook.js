import { useState } from "react";
import { Apis } from "../../lib/Apis";

export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const getAllUsers = async (setUsersData) => {
        try {
            const response = await Apis.getAllUsers();
            setUsersData(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error("🚀 ~ file: useHook.js ~ line 64 ~ getAllUsers ~ error", error)
            return error
        }
    }
    const updateUserStatus = async (id, status) => {
        try {
            setLoading(true);
            const requestBody = {
                id,
                status,
            };
            const response = await Apis.updateUSerStatus(requestBody);
            if (response && response.data) {
                return response;
            } else {
                console.error("Invalid response format:", response);
                return null;
            }
        } catch (error) {
            console.error("Error in Hook:", error.message || error);
            return null;
        } finally {
            setLoading(false);
        }
    }
    const searchUsers = async (searchQuery, statusFilter) => {
        try {
            const params = {};

            if (statusFilter !== "") {
                params.status = statusFilter === "true" ? true : false;
            }

            if (searchQuery) {
                params.name = searchQuery;
            }

            const response = await Apis.searchUsers(params);
            return response.data.data;
        } catch (error) {
            console.error("🚀 ~ file: useHook.js ~ line 64 ~ searchUsers ~ error", error);
            return error;
        }
    }

    return { getAllUsers, updateUserStatus, searchUsers };
}