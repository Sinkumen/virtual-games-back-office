import { useCreateRoom, useUpdateRoom } from "@/api/services/roomServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import FormSelect from "@/components/FormSelect";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React from "react";

const RoomForm = ({ room, onSuccess = () => {} }) => {
  const { showMessage } = useToast();

  const isEdit = Boolean(room);

  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();

  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoom();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const stake = e.target.stake.value;
    const delaySeconds = e.target.delaySeconds.value;
    const registrationPeriod = e.target.registrationPeriod.value;
    const commission = e.target.commission.value;
    const cashbackOnWinPatterns = e.target.cashbackOnWinPatterns.value || null;
    const winningPatterns = [
      "regular_vertical",
      "regular_horizontal",
      "regular_corners",
      "regular_trbl_diagonal",
      "regular_tlbr_diagonal",
      "full_house",
    ];

    const payload = {
      name,
      stake,
      delaySeconds,
      registrationPeriod,
      commission,
      winningPatterns,
      cashbackOnWinPatterns,
    };

    if (isEdit) {
      updateRoom(
        { ...room, ...payload },
        {
          onSuccess: () => {
            showMessage("Room Successfully Updated");
            onSuccess();
          },
          onError: (error) => {
            showMessage(error.message, { type: ERROR });
          },
        }
      );
    } else {
      createRoom(payload, {
        onSuccess: () => {
          showMessage("Room Successfully Created");
          onSuccess();
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    }
  };

  return (
    <div>
      {!isEdit && (
        <div>
          <p className=" font-bold text-[25px]">Create a room.</p>
          <p className=" font-urbanist-light mb-4 ">
            Create a room on the form below.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} method="POST">
        <div className="grid grid-cols-2 gap-2 pt-2 rounded-lg">
          <AppInput
            defaultValue={room?.name || ""}
            name={"name"}
            label={"Name"}
            placeholder={"Enter a name for the room"}
            required
          />
          <AppInput
            defaultValue={room?.stake || ""}
            type="number"
            name={"stake"}
            label={"Stake"}
            placeholder={"Enter the stake for the room"}
            required
          />

          <AppInput
            defaultValue={room?.registrationPeriod || ""}
            type="number"
            name={"registrationPeriod"}
            label={"Registration Period"}
            placeholder={"Enter the registration period for the room"}
            required
          />

          <AppInput
            defaultValue={room?.delaySeconds || ""}
            type="number"
            name={"delaySeconds"}
            label={"Draw Delay"}
            placeholder={"Enter the draw delay for the room"}
            required
          />

          <AppInput
            defaultValue={room?.commission || ""}
            type="number"
            name={"commission"}
            label={"Commission"}
            placeholder={"Enter the commission for the room"}
            required
          />

          <FormSelect
            defaultValue={room?.cashbackOnWinPatterns}
            name="cashbackOnWinPatterns"
            label={"Cashback Patterns"}
            placeholder={"Select cashback patterns"}
            required
            options={[
              { value: "disabled", label: "Disabled" },
              { value: "single_card", label: "Single Card" },
              { value: "all_cards", label: "All Cards" },
            ]}
          />
        </div>

        <AppButton
          type="submit"
          loading={isCreating || isUpdating}
          fullWidth
          className="my-4"
        >
          {isEdit ? "Update Room" : "Create Room"}
        </AppButton>
      </form>
    </div>
  );
};

export default RoomForm;
