import { useShopReports } from "@/api/services/shopServices";
import AppTable from "@/components/AppTable";
import EditForm from "@/components/EditForm";
import ReportFilter from "@/components/ReportFilter";
import React, { useState } from "react";
import ShopForm from "../../Forms/ShopForm";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import AppPagination from "@/components/AppPagination";
import { defaultDateRange, parseFilters } from "@/utils/parseFilters";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import ShopCards from "./ShopCards";

const Shops = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState(defaultDateRange);

  const onPageChange = (_event, page) => setCurrentPage(page);
  const onPageSizeChange = (event) => {
    setCurrentPage(1);
    setPageSize(event.target.value);
  };

  const {
    data: shopReport,
    isLoading,
    error,
  } = useShopReports(currentPage, pageSize, parseFilters(filters));

  const columns = [
    { id: 1, name: "Shop" },
    { id: 2, name: "Total Games" },
    { id: 3, name: "Total Stake" },
    { id: 4, name: "Total Income" },
    { id: 5, name: "Actions" },
  ];

  const rows = [];

  shopReport?.data?.data?.shops?.forEach((shop) =>
    rows.push([
      <div key={"action"}>
        <p className="font-bold">{shop.shopName} </p>
        <p>{shop.agentName}</p>
      </div>,
      shop.totalGames,
      `${shop.totalStake} Birr`,
      `${shop.totalIncome} Birr`,

      <div key={"action"} className="flex gap-2">
        <EditForm entity={shop} type="shop" />
        <ShopCards shop={shop} />
      </div>,
    ])
  );

  const totalCount = shopReport?.data?.data.total;
  const aggregate = shopReport?.data?.data?.aggregate;

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
        <p className="font-bold text-2xl">Shop Report</p>
        <div className="flex gap-2">
          <ReportFilter
            reportFilters={filters}
            setReportFilters={setFilters}
            options={{
              agentFilter: true,
              paginationFilters: true,
            }}
          />
          <div className="xl:hidden">
            <EditForm type="shop" />
          </div>
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
      <div className="flex-1 hidden xl:block">
        <ShopForm />
      </div>
    </div>
  );
};

export default Shops;
