import VerifyPayments from "@/components/Wallet/VerifyPayments";
import moment from "moment";

const {
  default: PaymentDetails,
} = require("@/components/Wallet/PaymentDetails");
const { default: StatusChip } = require("@/components/StatusChip");

export const getRow = (request) => [
  <div key={request?.id}>
    <div className="flex gap-1 items-end">
      <p className="font-bold text-lg text-slate-600">{request?.amount}</p>
      <p>Birr</p>
    </div>
    <p>{moment(request?.createdAt).fromNow()}</p>
  </div>,
  <div key={request?.id}>
    <p className="font-bold text-slate-600">{request?.userId?.username}</p>
    <p>{request?.userId?.phoneNumber}</p>
  </div>,
  <div key={request?.id} className="flex gap-1 flex-col">
    <p className="font-bold text-slate-600 capitalize">
      {request?.transactionMethod} {request?.type}
    </p>
    <StatusChip key={request?.id} status={request?.status} />
  </div>,

  <div key={request?.id} className="flex gap-2 items-end">
    <PaymentDetails request={request} />
    {(request?.status === "pending" || request.status === "initiated") &&
      request.transactionMethod === "chapa" && (
        <VerifyPayments request={request} />
      )}
  </div>,
];
