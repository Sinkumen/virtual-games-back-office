import { useUpdateUserStatus } from "@/api/services/playersServices";
import AppButton from "@/components/AppButton";
import AppDialog from "@/components/AppDialog";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import { FaUser, FaUserSlash } from "react-icons/fa6";

const PlayerActivation = ({ player }) => {
  const { showMessage } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus();

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const toggleActivation = () => {
    const payload = { userId: player?._id, isActive: !player.isActive };
    updateUserStatus(payload, {
      onSuccess: () => {
        showMessage(
          `Player ${
            !player.isActive ? "activated" : "deactivated"
          } successfully`
        );
        toggleDialog();
      },
      onError: (error) => {
        showMessage(
          `Error ${!player.isActive ? "activating" : "deactivating"} player: ${
            error.message
          }`,
          { type: ERROR }
        );
      },
    });
  };
  return (
    <div>
      <AppButton
        onClick={toggleDialog}
        bgColor={player.isActive ? "bg-red-500" : "bg-green-500"}
      >
        {player.isActive ? (
          <FaUserSlash className="text-lg" />
        ) : (
          <FaUser className="text-lg" />
        )}
      </AppButton>
      <AppDialog
        open={isDialogOpen}
        title="Player Activation"
        description={`Are you sure you want to ${
          player.isActive ? "deactivate" : "activate"
        } this player?`}
        confirmButtonLabel={`${player.isActive ? "Deactivate" : "Activate"}`}
        onClose={toggleDialog}
        onConfirm={toggleActivation}
        isLoading={isPending}
        warning={player.isActive}
      />
    </div>
  );
};

export default PlayerActivation;
