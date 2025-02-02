import { Apis } from '../../lib/Apis'

export const useBankAccount = () => {

    const getAllBankAccounts = async (setBankAccounts) => {
        try {
            const response = await Apis.getBankAccounts();
            setBankAccounts(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    const addBankAccount = async (data) => {
        try {
            const response = await Apis.addBankAccount(data);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
    const deleteBankAccount = async (accountNumber) => {
        try {
            const response = await Apis.delteBankAccount(accountNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    const editBankAccountDetails = async (id, data) => {
        try {
            const response = await Apis.updateBankAccount(id, data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    return { getAllBankAccounts, addBankAccount, deleteBankAccount, editBankAccountDetails }
}