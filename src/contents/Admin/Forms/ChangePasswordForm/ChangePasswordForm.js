import React from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput/AppInput";
import useToast from "@/hooks/useToast";
import { ERROR } from "@/constants/toast";
import { useChangePassword, useUpdateUser } from "@/api/services/userServices";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";
// import { useResetPassword } from "@/api/services/agentServices";
// import { useChangePassword } from "@/api/services/userServices";

const ChangePasswordForm = ({ user, onUpdateSuccess = () => {} }) => {
  const isReset = true;
  const { showMessage } = useToast();
  const { user: currentUser } = useUserContext();
  const { mutate: resetPassword, isPending: isResetting } = useUpdateUser();
  const { mutate: changePassword, isPending: isChanging } = useChangePassword();

  const handleChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.old_password.value;
    const newPassword = e.target.new_password.value;
    const confirmPassword = e.target.confirm_password.value;

    if (newPassword === confirmPassword) {
      const data = { oldPassword, newPassword };
      changePassword(data, {
        onSuccess: (data) => {
          showMessage("Password changed successfully!");
          e.target.reset();
          onUpdateSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      showMessage("Password confirmation doesn't match your new password.", {
        type: ERROR,
      });
    }
  };
  const handleReset = async (e) => {
    e.preventDefault();
    const newPassword = e.target.new_password.value;
    const confirmPassword = e.target.confirm_password.value;
    if (newPassword === confirmPassword) {
      const data = {
        id: user?._id || user?.cashierId || currentUser._id,
        password: newPassword,
      };
      resetPassword(data, {
        onSuccess: (data) => {
          showMessage("Password reset successful!");
          e.target.reset();
          onUpdateSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      showMessage("Password confirmation doesn't match your new password.", {
        type: ERROR,
      });
    }
  };
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <div>
        <p className=" font-urbanist-black text-[25px]">
          {" "}
          {isReset ? "Reset" : "Change"} Password
        </p>
        <p className=" font-urbanist-light mb-4 ">
          {isReset ? `Reset` : "Change"} password{" "}
          {isReset && ` for ${user?.username}`} on the form below.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          if (isReset) {
            handleReset(e);
          } else {
            handleChange(e);
          }
        }}
        method="POST"
      >
        {!isReset && (
          <AppInput
            autoFocus
            name="old_password"
            type="password"
            required={true}
            label="Old Password"
          />
        )}
        <AppInput
          name="new_password"
          type="password"
          required={true}
          label="New Password"
        />
        <AppInput
          name="confirm_password"
          type="password"
          required={true}
          label="Confirm Password"
        />

        <AppButton
          type="submit"
          className="mt-3"
          fullWidth
          loading={isChanging || isResetting}
        >
          {isReset ? "Reset" : "Change"} Password
        </AppButton>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
