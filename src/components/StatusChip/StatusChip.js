import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { TbSelect } from "react-icons/tb";

const StatusChip = ({ variant, status }) => {
  const statusStyles = {
    initiated: "bg-yellow-200 text-yellow-800",
    pending: "bg-orange-200 text-orange-800",
    success: "bg-green-200 text-green-800",
    successDeep: "bg-green-500 text-white",
    approved: "bg-green-200 text-green-800",
    failed: "bg-red-200 text-red-800",
    error: "bg-red-200 text-red-800",
    errorDeep: "bg-red-500 text-white",

    declined: "bg-red-200 text-red-800",
    won: "bg-green-200 text-green-800",
    lost: "bg-red-200 text-red-800",
    cancelled: "bg-gray-200 text-gray-800",
    completed: "bg-blue-200 text-blue-800",
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 px-2 py-1 rounded-sm capitalize ${
        statusStyles[variant || status]
      } text-center font-semibold text-xs`}
    >
      {status}
      {variant && variant === "successDeep" ? (
        <FaCheckCircle />
      ) : variant === "errorDeep" ? (
        <IoCloseCircle className="text-base" />
      ) : null}
    </div>
  );
};

export default StatusChip;
