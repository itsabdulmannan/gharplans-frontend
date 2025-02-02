import { Apis } from "../../lib/Apis";

const useUsers = () => {
  const getAdminDetails = async (setUserData) => {
    try {
      const response = await Apis.getUser();
      setUserData(response.data.getUser);
      return response.data;
    } catch (error) { }
  };
  return { getAdminDetails };
};

export default useUsers;