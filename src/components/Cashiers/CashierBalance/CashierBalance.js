import { useGetBalance } from "@/api/services/userServices";
import React, { useEffect, useState } from "react";
import BeatLoader from "../../BeatLoader";
import { MdRefresh, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";

const CashierBalance = () => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchStatus,
  } = useGetBalance();
  const [showBalance, setShowBalance] = useState(false);
  const [refetchInitiated, setRefetchInitiated] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    if (fetchStatus === "idle" && refetchInitiated) {
      setRefetchInitiated(false);
    }
  }, [fetchStatus]);

  return (
    <div className="flex gap-2 bg-gray-300 rounded-lg px-4 items-center">
      <button
        disabled={isLoading || isRefetching}
        onClick={() => {
          setRefetchInitiated(true);
          refetch();
        }}
        className="cursor-pointer"
      >
        <MdRefresh className="text-xl" />
      </button>
      <p className="hidden sm:block">Balance:</p>
      {isLoading || (isRefetching && refetchInitiated) ? (
        <BeatLoader />
      ) : showBalance ? (
        <p>
          <strong className="text-sm md:text-lg">
            {response?.data?.data?.balance || 0}
          </strong>{" "}
          Birr
        </p>
      ) : (
        <div className="flex gap-1">
          {" "}
          {[1, 2, 3, 4, 5].map((idx) => (
            <FaCircle className="text-[7px]" key={idx} />
          ))}
        </div>
      )}
      <button className="cursor-pointer" onClick={toggleBalanceVisibility}>
        {showBalance ? <MdVisibilityOff /> : <MdVisibility />}
      </button>
    </div>
  );
};

export default CashierBalance;
