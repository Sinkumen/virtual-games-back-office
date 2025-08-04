import {
  useCreateAgent,
  useGetAgents,
  useUpdateAgent,
} from "@/api/services/agentServices";
import {
  useCreateCashier,
  useUpdateCashier,
} from "@/api/services/cashierServices";
import {
  useCreateShops,
  useGetShops,
  useUpdateShops,
} from "@/api/services/shopServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { Skeleton } from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";

function CashierForm({ cashier, onSuccess = () => {} }) {
  const isEdit = Boolean(cashier);

  const { showMessage } = useToast();

  const [shop, setShop] = useState();

  const {
    data: shopsResponse,
    isLoading: areShopsLoading,
    error: shopsError,
  } = useGetShops();

  const shops = shopsResponse?.data?.data?.shops;

  useEffect(() => {
    setShop(shops?.find((shp) => shp._id === cashier?.shopId));
  }, [shops]);

  const { mutate: createCashier, isPending: isCreating } = useCreateCashier();

  const { mutate: updateCashier, isPending: isUpdating } = useUpdateCashier();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password === confirmPassword) {
      if (shop?._id) {
        const data = {
          firstName,
          lastName,
          username,
          password,
          shopId: shop?._id,
          role: "cashier",
        };
        createCashier(data, {
          onSuccess: () => {
            showMessage("Cashier Successfully Created");
            e.target.reset();
            setShop();
            onSuccess();
          },
          onError: (error) => {
            showMessage(error.message, { type: ERROR });
          },
        });
      } else {
        showMessage("Please select a shop", { type: ERROR });
      }
    } else {
      showMessage("Password confirmation is not correct.", { type: ERROR });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    const data = {
      id: cashier._id,
      firstName,
      lastName,
    };

    updateCashier(data, {
      onSuccess: () => {
        showMessage("Cashier edited successfully!");
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
          {!isEdit ? "Register" : "Edit"} Cashier.
        </p>
        <p className=" font-urbanist-light mb-4 ">
          {!isEdit ? "Register" : "Edit"} cashier on the form below.
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
          defaultValue={cashier?.firstName || ""}
          name={"firstName"}
          label={"First Name"}
          placeholder={"Enter cashier's first name"}
          required
        />
        <AppInput
          defaultValue={cashier?.lastName || ""}
          name={"lastName"}
          label={"Last Name"}
          placeholder={"Enter cashier's last name"}
          required
        />
        {!isEdit && (
          <>
            <AppInput
              disableAutoComplete
              defaultValue={cashier?.userName || ""}
              name={"username"}
              label={"Username"}
              placeholder={"Enter cashier's username"}
              required
            />
            <div>
              <p className="text-sm mt-3 mb-1">Shop</p>
              {areShopsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={45}
                  className=""
                  width={"100%"}
                />
              ) : (
                <AppSelect
                  Icon={FaShop}
                  options={shops}
                  placeholder="Select an shop for the cashier"
                  value={shop}
                  onChange={setShop}
                  className={"bg-[#F3F4F6]"}
                />
              )}
            </div>

            <AppInput
              disableAutoComplete
              name={"password"}
              type="password"
              label={"Password"}
              placeholder={"Enter agent's password."}
              required
            />

            <AppInput
              disableAutoComplete
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
          {!isEdit ? "Create Shop" : "Save"}
        </AppButton>
      </form>
    </div>
  );
}

export default CashierForm;
