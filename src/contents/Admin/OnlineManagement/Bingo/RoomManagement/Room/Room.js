import { useUpdateRoom } from "@/api/services/roomServices";
import AppDialog from "@/components/AppDialog";
import { cashbackPatterns } from "@/constants/cashback";
import { ERROR } from "@/constants/toast";
import RoomForm from "@/contents/Admin/Forms/RoomForm";
import useToast from "@/hooks/useToast";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { FaCoins, FaPercent } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import { MdClose, MdEdit } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";

const Room = ({ room }) => {
  const { showMessage } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: updateRooms, isPending } = useUpdateRoom();

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const toggleActivation = () => {
    updateRooms(
      { ...room, isActive: !room.isActive },
      {
        onSuccess: () => {
          showMessage(
            `Room ${!room.isActive ? "activated" : "deactivated"} successfully!`
          );
          toggleDialog();
        },
        onError: (error) => {
          showMessage(
            `Failed to ${!room.isActive ? "activate" : "deactivate"} room: ${
              error.message
            }`,
            { type: ERROR }
          );
        },
      }
    );
  };

  const roomSettings = [
    {
      label: "Join Time",
      value: `${room.registrationPeriod} seconds`,
      Icon: IoTimer,
    },
    { label: "Stake", value: `${room.stake} birr`, Icon: FaCoins },
    {
      label: "Draw Delay",
      value: `${room.delaySeconds} seconds`,
      Icon: RxLapTimer,
    },
    { label: "Commission", value: `${room.commission} %`, Icon: FaPercent },
    {
      label: "Cashback Pattern",
      value: cashbackPatterns[room.cashbackOnWinPatterns || "disabled"],
      Icon: FaPercent,
    },
  ];

  return (
    <div>
      <div className="ring-1 ring-gray-200 p-4 rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-between mb-2 r">
          <p className="font-bold text-lg">{room.name}</p>
          <div className="flex items-center gap-2">
            <Switch
              checked={room?.isActive}
              onChange={toggleDialog}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-red-500 transition data-checked:bg-green-600"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
            </Switch>
            <button
              onClick={toggleEditing}
              className="text-lg p-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-colors"
            >
              {isEditing ? <MdClose /> : <MdEdit />}
            </button>
          </div>
        </div>
        {isEditing ? (
          <RoomForm room={room} onSuccess={toggleEditing} />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {roomSettings.map((setting, index) => {
              const isLastItem = index === roomSettings.length - 1;
              const isOddLength = roomSettings.length % 2 !== 0;

              return (
                <RoomDetailCard
                  key={index}
                  Icon={setting.Icon}
                  label={setting.label}
                  value={setting.value}
                  className={`${isOddLength && isLastItem ? "col-span-2" : ""}`}
                />
              );
            })}
          </div>
        )}
      </div>
      <AppDialog
        warning={room?.isActive}
        title={room?.isActive ? "Deactivate Room" : "Activate Room"}
        description={`Are you sure you want to ${
          room?.isActive ? "deactivate" : "activate"
        } this room?`}
        confirmButtonLabel={room?.isActive ? "Deactivate" : "Activate"}
        open={isDialogOpen}
        onClose={toggleDialog}
        onConfirm={toggleActivation}
        isLoading={isPending}
      />
    </div>
  );
};

const RoomDetailCard = ({ Icon, label, value, className }) => {
  return (
    <div className={`bg-gray-100 p-2 rounded mb-2 ${className}`}>
      <div className="flex gap-2 items-center">
        <Icon className="text-lg text-gray-500" />
        <p className="font-bold text-gray-500">{label}</p>
      </div>

      <p>{value}</p>
    </div>
  );
};

export default Room;
