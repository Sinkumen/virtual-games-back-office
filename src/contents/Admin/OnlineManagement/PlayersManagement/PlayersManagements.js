import { useGetPlayers } from "@/api/services/playersServices";
import AppTable from "@/components/AppTable";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import { Tooltip } from "@mui/material";
import { truncate } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import PlayerTransactions from "./PlayerTransactions";
import RefillPlayerBalance from "./RefillPlayerBalance";
import PlayerActivation from "./PlayerActivation";
import AppInput from "@/components/AppInput";
import { MdSearch } from "react-icons/md";
import AppButton from "@/components/AppButton";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import AppPagination from "@/components/AppPagination";
import useToast from "@/hooks/useToast";
import { ERROR } from "@/constants/toast";

const PlayersManagements = () => {
  const { showMessage } = useToast();
  const [filters, setFilters] = useState({ page: 1, limit: 20 });

  const { data: playersResponse, isLoading, refetch } = useGetPlayers(filters);

  const players = playersResponse?.data?.data?.users || [];
  const pagination = playersResponse?.data?.data?.pagination || {};

  const onPageChange = (_event, page) => setFilters({ ...filters, page });
  const onPageSizeChange = (event) => {
    setFilters({ ...filters, page: 1, limit: event.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    let phone = e.target.phone.value;
    if (!phone) {
      setFilters({ ...filters, phoneNumber: "" });
      return;
    }

    const parsedPhoneNumber = parsePhoneNumberWithError(phone, "ET");

    if (parsedPhoneNumber.isValid()) {
      setFilters({
        ...filters,
        phoneNumber: parsedPhoneNumber.nationalNumber,
        _nonce: Date.now(),
      });
    } else {
      showMessage("Please enter a valid phone number!", { type: ERROR });
    }
  };

  const columns = [
    { id: "name", name: "Name" },
    { id: "phone", name: "Phone" },
    { id: "balance", name: "Balance" },
    { id: "action", name: "Action" },
  ];

  const rows = players.map((player) => [
    <div key={player.id}>
      <div className="flex gap-2 items-center">
        <span
          className={`w-2 h-2 rounded-full ${
            player.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <div>
          <p className="font-bold">
            {truncate(`${player.firstName} ${player.lastName}`, { length: 20 })}
          </p>
          <p className="text-xs">Joined {moment(player.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>,
    <div key={player.id}>
      <p className="font-bold">{player.phoneNumber}</p>
    </div>,

    <div key={player.id}>
      <p className="font-bold ">Total: {player.userDetail.balance} Birr</p>
      <p className="text-sm text-gray-500">
        Payout: {player.userDetail.withdrawableBalance} Birr
      </p>
    </div>,
    <div key={player.id} className="flex gap-1 items-center">
      <PlayerTransactions player={player} />
      <RefillPlayerBalance player={player} />
      <PlayerActivation player={player} />
    </div>,
  ]);

  return (
    <div>
      <p className="font-bold text-[25px]">Players Managements</p>

      <form onSubmit={handleSearch} className="flex gap-2 items-center my-2">
        <AppInput
          type="phone"
          name="phone"
          placeholder="Search by phone number"
        />
        <AppButton type="submit" disabled={isLoading}>
          <MdSearch />
        </AppButton>
      </form>

      {isLoading ? (
        <ManagePageSkeleton />
      ) : (
        <>
          <AppTable columns={columns} rows={rows} />
          <AppPagination
            page={filters.page}
            onPageChange={onPageChange}
            count={pagination?.pages || 0}
            limit={filters.limit}
            onLimitChange={onPageSizeChange}
          />
        </>
      )}
    </div>
  );
};

export default PlayersManagements;
