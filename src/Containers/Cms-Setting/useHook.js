import { Apis } from '../../lib/Apis';

export const useHook = () => {
    const getTermAndCondition = async (setTermsAndConditions) => {
        const response = await Apis.getTermsAndConditions();
        setTermsAndConditions(response.data);
        return response.data;
    };

    const addTermsAndConditions = async (data) => {
        const response = await Apis.addTermsAndConditions(data);
        return response.data;
    };

    const updateTermsAndConditions = async (data, id) => {
        const response = await Apis.updateTermsAndConditions(data, id);
        return response.data;
    };

    const getPrivacyPolicy = async (setPrivacyPolicy) => {
        const response = await Apis.getPrivacyPolicy();
        setPrivacyPolicy(response.data);
        return response.data;
    };

    const addPrivacyPolicy = async (data) => {
        const response = await Apis.addPrivacyPolicy(data);
        return response.data;
    };

    const updatePrivacyPolicy = async (data, id) => {
        const response = await Apis.updatePrivacyPolicy(data, id);
        return response.data;
    };

    const getFaqManagement = async (setFaqManagement) => {
        const response = await Apis.getFaqManagement();
        setFaqManagement(response.data);
        return response.data;
    };

    const addFaqManagement = async (data) => {
        const response = await Apis.addFaqManagement(data);
        return response.data;
    };

    const updateFaqManagement = async (data, id) => {
        const response = await Apis.updateFaqManagement(data, id);
        return response.data;
    };

    return {
        getTermAndCondition,
        getPrivacyPolicy,
        getFaqManagement,
        addTermsAndConditions,
        addPrivacyPolicy,
        addFaqManagement,
        updateTermsAndConditions,
        updatePrivacyPolicy,
        updateFaqManagement,
    };
};
