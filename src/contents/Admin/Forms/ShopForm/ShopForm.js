import {
  useCreateAgent,
  useGetAgents,
  useUpdateAgent,
} from "@/api/services/agentServices";
import { useCreateShops, useUpdateShops } from "@/api/services/shopServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import RoleWrapper from "@/components/RoleWrapper";
import { ERROR } from "@/constants/toast";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";
import useToast from "@/hooks/useToast";
import { Skeleton } from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import { MdSupportAgent } from "react-icons/md";

const ShopForm = ({ shop, onSuccess = () => {} }) => {
  const { showMessage } = useToast();
  const { user } = useUserContext();

  const [agent, setAgent] = useState();

  const isEdit = Boolean(shop);
  const isAgent = user?.role === "agent";

  const {
    data: agentsResponse,
    isLoading: areAgentsLoading,
    error: agentsError,
  } = useGetAgents(isAgent);

  const agents = agentsResponse?.data?.data?.users;

  useEffect(() => {
    setAgent(agents?.find((ag) => ag._id === shop?.agentId));
  }, [agents]);

  const { mutate: createShop, isPending: isCreating } = useCreateShops();

  const { mutate: updateShop, isPending: isUpdating } = useUpdateShops();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.shopName.value;
    const location = e.target.location.value;
    let agentId = agent?._id;
    const commission = e.target.commission.value;

    if (isAgent) {
      agentId = user._id;
    }

    if (agentId) {
      const data = {
        name,
        location,
        agentId,
        commission,
      };
      createShop(data, {
        onSuccess: () => {
          showMessage("Agent Successfully Created");
          e.target.reset();
          setAgent();
          onSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      showMessage("Please select an agent", { type: ERROR });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.shopName.value;
    const location = e.target.location.value;
    let agentId = agent?._id;
    const commission = e.target.commission.value;

    if (isAgent) {
      agentId = user._id;
    }

    const data = {
      id: shop._id,
      name,
      location,
      agentId,
      commission,
    };

    updateShop(data, {
      onSuccess: () => {
        showMessage("Shop edited successfully!");
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
          {!isEdit ? "Register" : "Edit"} a shop.
        </p>
        <p className=" font-urbanist-light mb-4 ">
          {!isEdit ? "Register" : "Edit"} an shop on the form below.
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
          defaultValue={shop?.shopName || ""}
          name={"shopName"}
          label={"Shop Name"}
          placeholder={"Enter a name for the shop"}
          required
        />
        <AppInput
          defaultValue={shop?.location || ""}
          name={"location"}
          label={"Location"}
          placeholder={"Enter the location of the shop"}
          required
        />
        <RoleWrapper allowedRoles={["admin"]}>
          <div>
            <p className="text-sm mt-3 mb-1">Agents</p>
            {areAgentsLoading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                height={45}
                className=""
                width={"100%"}
              />
            ) : (
              <AppSelect
                Icon={MdSupportAgent}
                options={agents}
                placeholder="Select an agent for the shop"
                value={agent}
                onChange={setAgent}
                className={"bg-[#F3F4F6]"}
              />
            )}
          </div>
        </RoleWrapper>

        <AppInput
          defaultValue={shop?.commission && Number(shop?.commission)}
          name="commission"
          type="number"
          label={"Commission"}
          placeholder={"Enter commission in %"}
          step={5}
          min={5}
        />

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
};

export default ShopForm;
