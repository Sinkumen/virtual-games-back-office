import AppButton from "@/components/AppButton";
import React, { useState } from "react";

import AccountForm from "./AccountForm";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  useDeleteAccountEntry,
  useUpdateAccountEntry,
} from "@/api/services/transactionServices";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { CircularProgress } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import AppDialog from "@/components/AppDialog";

const AccountNumbers = ({ account }) => {
  const { showMessage } = useToast();
  const { label, name, accountNumbers } = account || {};
  const activeAccount = accountNumbers.find((acc) => acc?.isActive);
  const [accountToBeEdited, setAccountToBeEdited] = useState();
  const [accountToBeDeleted, setAccountToBeDeleted] = useState();
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selected, setSelected] = useState(activeAccount);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const { mutate: updateAccount, isPending: isUpdatingAccount } =
    useUpdateAccountEntry();

  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccountEntry();

  const handleAccountSelection = (newSelection) => {
    const old = selected && { ...selected };
    setSelected(newSelection);
    updateAccount(
      { ...newSelection, isActive: true },
      {
        onSuccess: () => {
          showMessage("Account activated successfully!");
          setAccountToBeDeleted();
        },
        onError: (error) => {
          showMessage("Failed to activate account", { type: ERROR });
          setSelected(old);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteAccount(accountToBeDeleted, {
      onSuccess: () => {
        showMessage("Account deleted successfully!");
        toggleDialog();
      },
      onError: (error) => {
        showMessage("Failed to delete account", { type: ERROR });
        setSelected(old);
      },
    });
  };

  if (accountToBeEdited || isCreatingNew) {
    return (
      <div className="py-2">
        <p className="font-semibold text-center bg-gray-400 py-1 text-white mb-2">
          {label}
        </p>
        <AccountForm
          account={isCreatingNew ? null : accountToBeEdited}
          method={account}
          onSuccess={() => {
            setIsCreatingNew(false);
            setAccountToBeEdited();
          }}
        />
      </div>
    );
  }

  return (
    <div className="py-2">
      <p className="font-semibold text-center bg-gray-400 py-1 text-white mb-2">
        {label}
      </p>
      <RadioGroup value={selected} onChange={handleAccountSelection}>
        {accountNumbers?.map((number) => {
          const isActive = number._id === selected?._id;
          return (
            <Radio
              key={number.accountNumber}
              value={number}
              className={`group border-primary border-[1px] relative flex items-center cursor-pointer rounded-lg p-2 pr-3 transition focus:outline-none ${
                isActive ? "bg-primary/20 border-0" : ""
              }  data-[focus]:outline data-[focus]:outline-white my-2`}
            >
              <div className="rounded-lg my-2 flex-1">
                <p className="font-bold">{number.accountNumber}</p>
                <p className="text-gray-600 text-sm">{number.holder}</p>
              </div>

              <div className="flex gap-1 items-center">
                {isUpdatingAccount && selected?._id === number?._id ? (
                  <CircularProgress size={20} sx={{ color: "green" }} />
                ) : (
                  <CheckCircleIcon
                    className={`size-6 fill-primary opacity-0 transition ${
                      isActive ? "opacity-100" : ""
                    }`}
                  />
                )}
                <div
                  className="bg-primary/20 rounded-md p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccountToBeEdited(number);
                  }}
                >
                  <MdEdit className="text-xl text-primary" />
                </div>

                <div
                  className="bg-primary/20 rounded-md p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccountToBeDeleted(number);
                    toggleDialog();
                  }}
                >
                  <MdDelete className="text-xl text-primary" />
                </div>
              </div>
            </Radio>
          );
        })}
      </RadioGroup>

      <AppButton onClick={() => setIsCreatingNew(true)} fullWidth>
        Add account number
      </AppButton>
      <AppDialog
        title="Delete an account!"
        description={`Are you sure you want to delete this account?`}
        open={isDialogOpen}
        onClose={toggleDialog}
        onConfirm={handleDelete}
        isLoading={isDeletingAccount}
        confirmButtonLabel="Delete"
      />
    </div>
  );
};

export default AccountNumbers;
