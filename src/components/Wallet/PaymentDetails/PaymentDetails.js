import React, { useState } from "react";
import AppButton from "../../AppButton";
import { FaEye } from "react-icons/fa6";
import AppDialog from "../../AppDialog";
import AppModal from "../../AppModal";
import moment from "moment";
import { MdCopyAll, MdPayment } from "react-icons/md";
import StatusChip from "../../StatusChip";
import { Divider } from "@mui/material";
import { useResolvePaymentRequest } from "@/api/services/transactionServices";
import useToast from "@/hooks/useToast";
import { ERROR } from "@/constants/toast";

const PaymentDetails = ({ request }) => {
  const { showMessage } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resolvingStatus, setResolvingStatus] = useState("");
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const {
    mutate: resolveRequest,
    isPending,
    error,
  } = useResolvePaymentRequest();

  const handleCopyToClipboard = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    showMessage("Account number copied to clipboard");
  };

  const details =
    request.type === "deposit"
      ? {
          Player: request.userId?.username,
          "Deposit Bank": request?.transactionMethod,
          Status: <StatusChip status={request.status} />,
          "Created At": moment(request.createdAt).fromNow(),
          Amount: <p className="font-bold text-2xl">{request.amount} Birr</p>,
          "Transaction ID": request.transactionId,
        }
      : {
          Player: request.userId?.username,
          "Withdrawal Method": (
            <p className="font-semibold ">{request?.transactionMethod}</p>
          ),
          "Withdrawal Account": (
            <div className="flex gap-2 items-center justify-end">
              <p className="font-semibold ">{request?.accountNumber}</p>
              <button
                type="button"
                onClick={() => handleCopyToClipboard(request?.accountNumber)}
                className="bg-gray-400 p-1 rounded-md cursor-pointer"
              >
                <MdCopyAll className="text-xl text-white" />
              </button>
            </div>
          ),
          "Account Name": (
            <p className="font-semibold ">{request?.accountHolderName}</p>
          ),
          status: <StatusChip status={request.status} />,
          "Created At": moment(request.createdAt).fromNow(),
          Amount: <p className="font-bold text-2xl">{request.amount} Birr</p>,
        };

  const handleResolve = () => {
    const data = {
      id: request._id,
      status: resolvingStatus,
    };
    resolveRequest(data, {
      onSuccess: () => {
        showMessage(`Request ${resolvingStatus} successfully.`);
        setIsModalOpen(false);
        setResolvingStatus("");
        setIsDialogOpen(false);
      },
      onError: (error) => {
        showMessage(`Failed to ${resolvingStatus} request.`, { type: ERROR });
        setIsDialogOpen(false);
      },
    });
  };

  const canResolve =
    request.status === "pending" && request.transactionMethod !== "chapa";

  return (
    <div className="flex gap-2">
      <AppButton onClick={() => setIsModalOpen(true)}>
        <FaEye />
      </AppButton>
      <AppModal
        className={"w-[90%] sm:w-[70%] md:w-[50%]  xl:w-[30%] 2xl:w-[25%]"}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <MdPayment className="text-3xl" />
            <h2 className="text-lg font-bold">Payment Details</h2>
          </div>
          <div>
            {Object.entries(details).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between items-center gap-2">
                  <p className="font-bold flex-1 text-sm">{key}</p>
                  <div className="max-h-[150px] overflow-y-auto custom-scrollbar flex-2/12 text-sm text-right">
                    {value}
                  </div>
                </div>
                <Divider sx={{ my: 1 }} />
              </div>
            ))}
          </div>
          {canResolve && (
            <div className="flex gap-2">
              <div className="flex-1">
                <AppButton
                  dense
                  disabled={!canResolve}
                  fullWidth
                  className={"bg-red-500"}
                  onClick={() => {
                    setResolvingStatus("declined");
                    toggleDialog();
                  }}
                >
                  Decline
                </AppButton>
              </div>
              <div className="flex-1">
                <AppButton
                  dense
                  disabled={!canResolve}
                  fullWidth
                  onClick={() => {
                    setResolvingStatus("approved");
                    toggleDialog();
                  }}
                >
                  Approve
                </AppButton>
              </div>
            </div>
          )}
        </div>
      </AppModal>
      <AppDialog
        title="Confirm"
        description={`Are you sure you want to ${resolvingStatus} this request?`}
        open={isDialogOpen}
        onClose={toggleDialog}
        onConfirm={handleResolve}
        isLoading={isPending}
        confirmButtonLabel="Confirm"
      />
    </div>
  );
};

export default PaymentDetails;
