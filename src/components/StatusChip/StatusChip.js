import React from "react";

const StatusChip = ({ status }) => {
  const statusStyles = {
    initiated: "bg-yellow-200 text-yellow-800",
    pending: "bg-orange-200 text-orange-800",
    success: "bg-green-200 text-green-800",
    approved: "bg-green-200 text-green-800",
    failed: "bg-red-200 text-red-800",
    declined: "bg-red-200 text-red-800",
  };

  return (
    <div
      className={`px-2 py-1 rounded-sm capitalize ${statusStyles[status]} text-center font-semibold text-xs`}
    >
      {status}
    </div>
  );
};

export default StatusChip;
