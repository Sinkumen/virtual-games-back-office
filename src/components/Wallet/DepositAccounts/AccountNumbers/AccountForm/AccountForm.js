import {
  useCreateAccountEntry,
  useUpdateAccountEntry,
} from "@/api/services/transactionServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import React from "react";

const AccountForm = ({ account, method, onSuccess }) => {
  const { showMessage } = useToast();
  const { mutate: createAccount, isPending: isCreatingAccount } =
    useCreateAccountEntry();
  const { mutate: updateAccount, isPending: isUpdatingAccount } =
    useUpdateAccountEntry();

  const handleSubmit = (event) => {
    event.preventDefault();
    const isExisting = Boolean(account?._id);

    const holder = event.target.account_holder.value;
    let accountNumber = event.target.account_number.value;

    if (method.isMobileMoney) {
      const parsedPhoneNumber = parsePhoneNumberWithError(accountNumber, "ET");
      if (parsedPhoneNumber.isValid()) {
        accountNumber = parsedPhoneNumber.number;
      } else {
        showMessage("Invalid phone number", { type: ERROR });
        return;
      }
    }

    const payload = {
      accountNumber,
      holder,
    };

    if (!isExisting) {
      const accountDetailId = method?._id;
      payload["accountDetailId"] = accountDetailId;
      createAccount(payload, {
        onSuccess: () => {
          showMessage("Account created successfully!");
          onSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      updateAccount(
        { ...account, ...payload },
        {
          onSuccess: () => {
            showMessage("Account edited successfully!");
            onSuccess();
          },
          onError: (error) => {
            showMessage(error.message, { type: ERROR });
          },
        }
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <AppInput
          defaultValue={
            method.isMobileMoney
              ? Number(account?.accountNumber)
              : account?.accountNumber
          }
          name="account_number"
          type={method.isMobileMoney ? "phone" : "number"}
          required={true}
          label="Account Number"
        />
        <AppInput
          defaultValue={account?.holder}
          name="account_holder"
          required={true}
          label="Account Holder"
        />

        <div className="flex gap-2 mt-3">
          <AppButton outlined fullWidth onClick={onSuccess}>
            Discard
          </AppButton>
          <AppButton
            type="submit"
            fullWidth
            loading={isCreatingAccount || isUpdatingAccount}
          >
            {account ? "Save" : "Create"}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
