import { useCreateAgent, useUpdateAgent } from "@/api/services/agentServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { parsePhoneNumber } from "libphonenumber-js";
import React from "react";

const AgentForm = ({ agent, onSuccess = () => {} }) => {
  const isEdit = Boolean(agent);

  const { showMessage } = useToast();

  const { mutate: createAgent, isPending: isCreating } = useCreateAgent();

  const { mutate: updateAgent, isPending: isUpdating } = useUpdateAgent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password === confirmPassword) {
      const data = { firstName, lastName, username, password, role: "agent" };
      createAgent(data, {
        onSuccess: () => {
          showMessage("Agent Successfully Created");
          e.target.reset();
          onSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      showMessage("Password confirmation failed.", { type: ERROR });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    const data = {
      id: agent?._id || agent?.agentId,
      firstName,
      lastName,
    };

    updateAgent(data, {
      onSuccess: () => {
        showMessage("Agent edited successfully!");
        e.target.reset();
        onSuccess();
      },
      onError: () => {
        showMessage(updatingError.message, { type: ERROR });
      },
    });
  };

  return (
    <div>
      <div>
        <p className=" font-bold text-[25px]">
          {" "}
          {!isEdit ? "Register" : "Edit"} an Agent
        </p>
        <p className=" font-urbanist-light mb-4 ">
          {!isEdit ? "Register" : "Edit"} an Agent on the form below.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          if (isEdit) {
            handleEdit(e);
          } else {
            handleSubmit(e);
          }
        }}
        method="POST"
      >
        <AppInput
          defaultValue={agent?.firstName || ""}
          name={"firstName"}
          label={"First Name"}
          placeholder={"Enter agent's first name"}
          required
        />
        <AppInput
          defaultValue={agent?.lastName || ""}
          name={"lastName"}
          label={"Last Name"}
          placeholder={"Enter agent's last name"}
          required
        />

        {!isEdit && (
          <>
            <AppInput
              disableAutoComplete
              defaultValue={agent?.username || ""}
              name={"username"}
              label={"Username"}
              placeholder={"Enter agents's username"}
              required
            />
            <AppInput
              disableAutoComplete
              name={"password"}
              type="password"
              label={"Password"}
              placeholder={"Enter agent's password."}
              required
            />
            <AppInput
              name={"confirmPassword"}
              type="password"
              label={"Confirm Password"}
              placeholder={"Confirm agent's password."}
              required
            />
          </>
        )}

        <AppButton
          type="submit"
          loading={isCreating || isUpdating}
          fullWidth
          className="my-4"
        >
          {!isEdit ? "Register Agent" : "Save"}
        </AppButton>
      </form>
    </div>
  );
};

export default AgentForm;
