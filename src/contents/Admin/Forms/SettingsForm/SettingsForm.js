import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import React from "react";
import { getFormattedValues } from "../../OnlineManagement/Settings/helpers/getFormattedValues";
import { useUpdateOnlineTenantSetting } from "@/api/services/tenantServices";
import useToast from "@/hooks/useToast";

const SettingsForm = ({ setting, settingIdentifier, onSuccess = () => {} }) => {
  const { showMessage } = useToast();
  const formattedValues = getFormattedValues(setting, settingIdentifier);

  const { mutate: updateSetting, isPending } = useUpdateOnlineTenantSetting();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let values = Object.fromEntries(formData.entries());

    if (settingIdentifier === "walletSettings") {
      const parsedValues = {};
      parsedValues.depositAmount = {
        minDeposit: values.minDeposit,
        maxDeposit: values.maxDeposit,
      };
      parsedValues.withdrawalAmount = {
        minWithdrawal: values.minWithdrawal,
        maxWithdrawal: values.maxWithdrawal,
      };
      values = parsedValues;
    }
    const payload = { [settingIdentifier]: values };
    updateSetting(payload, {
      onSuccess: () => {
        showMessage("Setting updated successfully");
        onSuccess();
      },
      onError: (error) => {
        showMessage(
          error?.response?.data?.message || "Failed to update setting",
          { type: "error" }
        );
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="grid grid-cols-2 gap-2 pt-2 rounded-lg">
          {formattedValues.map((item, index) => {
            const isLastItem = index === formattedValues.length - 1;
            const isOddLength = formattedValues.length % 2 !== 0;
            return (
              <AppInput
                key={index}
                defaultValue={item.formValue || 0}
                type="number"
                name={item.name}
                label={item.label}
                placeholder={`Enter ${item.label.toLowerCase()}`}
                required
                className={`${isOddLength && isLastItem ? "col-span-2" : ""}`}
              />
            );
          })}
        </div>

        <AppButton type="submit" loading={isPending} fullWidth className="my-4">
          {"Save"}
        </AppButton>
      </form>
    </div>
  );
};

export default SettingsForm;
