import { Apis } from "../../lib/Apis";

export const useBannerHook = () => {
  const addBanner = async (data) => {
    try {
      const response = await Apis.addBanner(data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const getBanners = async (setBanners) => {
    try {
      const response = await Apis.getBanners();
      if (setBanners && response?.data) {
        setBanners(response.data);
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const updateBanner = async (bannerId, data) => {
    try {
      // Ensure you have Apis.updateBanner in your Apis file
      const response = await Apis.updateBanner(bannerId, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const deleteBanner = async (bannerId) => {
    try {
      const response = await Apis.deleteBanner(bannerId);
      return response;
    } catch (error) {
      return error;
    }
  };

  return {
    addBanner,
    getBanners,
    updateBanner,
    deleteBanner,
  };
};
