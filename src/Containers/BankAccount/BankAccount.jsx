import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalBankAccount from "../../Components/Modals/BankAccountDetails/ModalBankAccount";
import { useBankAccount } from "./useHook";
import Swal from "sweetalert2";

function BankAccount() {
  const {
    getAllBankAccounts,
    addBankAccount,
    deleteBankAccount,
    editBankAccountDetails,
  } = useBankAccount();
  const [showModal, setShowModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);

  useEffect(() => {
    getAllBankAccounts(setBankAccounts);
  }, []);

  const handleAddClick = () => {
    setEditingAccount(null);
    setShowModal(true);
  };

  const handleSave = async (newAccount) => {
    try {
        if (editingAccount) {
            const response = await editBankAccountDetails(editingAccount.id, newAccount);
            if (response && response.data) {
                setBankAccounts((prevAccounts) =>
                    prevAccounts.map((account) =>
                        account.id === editingAccount.id ? response.data : account
                    )
                );

                Swal.fire({
                    title: "Success!",
                    text: "Bank account updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } else {
            const response = await addBankAccount(newAccount);
            if (response && response.data) {
                setBankAccounts((prevAccounts) => [...prevAccounts, response.data]);

                Swal.fire({
                    title: "Success!",
                    text: "Bank account added successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        }
        setShowModal(false);
        getAllBankAccounts(setBankAccounts);
    } catch (error) {
        console.error("Error saving bank account:", error);
        Swal.fire({
            title: "Error!",
            text: "There was an issue saving the bank account.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};


const handleEdit = (account) => {
  setEditingAccount(account);
  setShowModal(true);
};

  const handleDelete = async (accountNumber) => {
    try {
      const response = await deleteBankAccount(accountNumber);
      if (response && response.data) {
        setBankAccounts((prevAccounts) =>
          prevAccounts.filter(
            (account) => account.accountNumber !== accountNumber
          )
        );
        Swal.fire({
          title: "Deleted!",
          text: "Bank account deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        getAllBankAccounts(setBankAccounts);
      }
    } catch (error) {
      console.error("Error deleting bank account:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the bank account.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bank Account Details</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Bank Account
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary-dark to-primary-light text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Sr No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Bank Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Account Holder Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Account Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                IBAN
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Branch Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((account, index) => (
              <tr key={account.accountNumber}>
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{account.bankName}</td>
                <td className="px-4 py-2 border-b">
                  {account.accountHolderName}
                </td>
                <td className="px-4 py-2 border-b">{account.accountNumber}</td>
                <td className="px-4 py-2 border-b">{account.iban}</td>
                <td className="px-4 py-2 border-b">{account.branchCode}</td>
                <td className="px-4 py-2 border-b">{account.status}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="bg-primary-dark text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalBankAccount
        show={showModal}
        close={handleCloseModal}
        settingData={editingAccount}
        handleSave={handleSave}
      />
    </div>
  );
}

export default BankAccount;
