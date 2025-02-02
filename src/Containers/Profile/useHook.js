import { Apis } from "../../lib/Apis";

export const useProfile = () => {
  const getProfile = async (setUserData) => {
    try {
      const response = await Apis.getUser();
      setUserData(response.data.getUser);
      return response;
    } catch (error) {
      return error;
    }
  };

  const updatePassword = async (body) => {
    try {
      const response = await Apis.updatePassword(body);
      if (response?.status === 200) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  return {
    getProfile,
    updatePassword,
  };
};
