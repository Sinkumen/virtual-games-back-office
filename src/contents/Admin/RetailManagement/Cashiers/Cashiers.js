import AppTable from "@/components/AppTable";
import EditForm from "@/components/EditForm";
import ReportFilter from "@/components/ReportFilter";
import React, { useState } from "react";
import ShopForm from "../../Forms/ShopForm";
import { useCashierReports } from "@/api/services/cashierServices";
import CashierForm from "../../Forms/CashierForm";
import ChangePassword from "@/components/ChangePassword";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import AppPagination from "@/components/AppPagination";
import { defaultDateRange, parseFilters } from "@/utils/parseFilters";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import RefillBalance from "./RefillBalance";
import RoleWrapper from "@/components/RoleWrapper";

const Cashiers = ({ forCashier }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState(defaultDateRange);

  const onPageChange = (_event, page) => setCurrentPage(page);
  const onPageSizeChange = (event) => {
    setCurrentPage(1);
    setPageSize(event.target.value);
  };

  const {
    data: cashierReport,
    isLoading,
    error,
  } = useCashierReports(currentPage, pageSize, parseFilters(filters));

  const columns = [
    { id: 1, name: "Cashier" },
    { id: 2, name: "Shop" },
    { id: 3, name: "Balance" },
    { id: 4, name: "Total Games" },
    { id: 5, name: "Total Stake" },
    { id: 6, name: "Total Income" },
    { id: 6, name: "Actions", allowedRoles: ["admin", "agents"] },
  ];

  const rows = [];

  cashierReport?.data?.data?.cashiers?.forEach((cashier) => {
    let row = [
      <div key={"action"}>
        <p className="font-bold">
          {`${cashier.firstName} ${cashier.lastName}`}
        </p>
        <p>{cashier.username}</p>
      </div>,
      cashier.shopName,
      `${cashier.balance} Birr`,
      cashier.totalGames,
      `${cashier.totalStake} Birr`,
      `${cashier.totalIncome} Birr`,
      !forCashier ? (
        <div key={"action"} className="flex gap-2 w-full">
          <EditForm entity={cashier} type="cashier" />
          <RefillBalance cashier={cashier} />
          <ChangePassword user={cashier} />
        </div>
      ) : (
        "hide"
      ),
    ];
    row = row.filter((cell) => cell !== "hide");
    rows.push(row);
  });

  const totalCount = cashierReport?.data?.data.total;
  const aggregate = cashierReport?.data?.data?.aggregate;

  const aggregateOverview = [
    {
      title: "Revenue",
      value: `${aggregate?.totalIncome} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Sales",
      value: `${aggregate?.totalStake} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Games",
      value: aggregate?.totalGames,
      icon: FaMoneyBillTrendUp,
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="flex-2 flex flex-col gap-2">
        <p className="font-bold text-2xl">Cashier Report</p>
        <div className="flex gap-2">
          <ReportFilter
            reportFilters={filters}
            setReportFilters={setFilters}
            options={{
              shopFilter: !forCashier,
              agentFilter: !forCashier,
              paginationFilters: true,
            }}
          />
          <RoleWrapper allowedRoles={["admin", "agent"]}>
            <div className="xl:hidden">
              <EditForm type="cashier" />
            </div>
          </RoleWrapper>
        </div>
        {isLoading ? (
          <ManagePageSkeleton />
        ) : (
          <>
            <AggregateCard aggregateReport={aggregateOverview} />
            <AppTable rows={rows} columns={columns} />
            {Boolean(totalCount) && (
              <AppPagination
                page={currentPage}
                onPageChange={onPageChange}
                count={Math.ceil(totalCount / pageSize)}
                limit={pageSize}
                onLimitChange={onPageSizeChange}
              />
            )}
          </>
        )}
      </div>
      <RoleWrapper allowedRoles={["admin", "agent"]}>
        <div className="flex-1 hidden xl:block">
          <CashierForm />
        </div>
      </RoleWrapper>
    </div>
  );
};

export default Cashiers;
