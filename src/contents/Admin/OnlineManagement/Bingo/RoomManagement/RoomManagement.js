import { useGetRooms } from "@/api/services/roomServices";
import AppDialog from "@/components/AppDialog";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { FaCoins, FaPercent } from "react-icons/fa6";
import { IoAdd, IoTimer } from "react-icons/io5";
import { MdClose, MdEdit } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { TbPercentage } from "react-icons/tb";
import Room from "./Room/Room";
import AppButton from "@/components/AppButton";
import RoomSkeleton from "./RoomSkeleton";

const RoomManagement = () => {
  const { data: roomsResponse, isLoading, error } = useGetRooms();

  if (isLoading) return <RoomSkeleton />;

  const rooms = roomsResponse?.data?.data?.rooms;

  return (
    <div className="md:p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-2xl">Room Management</p>
        <AppButton dense icon={<IoAdd />}>
          Add Room
        </AppButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {rooms?.map((room) => (
          <Room key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;
