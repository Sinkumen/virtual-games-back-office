import AppTable from "@/components/AppTable";
import React, { useState } from "react";
import AgentForm from "../../Forms/AgentForm";
import {
  useGetAgentReports,
  usePaginatedAgents,
} from "@/api/services/agentServices";
import EditForm from "@/components/EditForm";
import ChangePassword from "@/components/ChangePassword";
import ReportFilter from "@/components/ReportFilter";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import AppPagination from "@/components/AppPagination";
import { defaultDateRange, parseFilters } from "@/utils/parseFilters";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Agents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState(defaultDateRange);

  const onPageChange = (_event, page) => setCurrentPage(page);
  const onPageSizeChange = (event) => {
    setCurrentPage(1);
    setPageSize(event.target.value);
  };

  const {
    data: agentReport,
    isLoading,
    error,
  } = useGetAgentReports(currentPage, pageSize, parseFilters(filters));

  const columns = [
    { id: 1, name: "Agent" },
    { id: 2, name: "Total Games" },
    { id: 3, name: "Total Stake" },
    { id: 4, name: "Total Income" },
    { id: 5, name: "Actions" },
  ];

  const rows = [];

  agentReport?.data?.data?.agents?.forEach((agent) =>
    rows.push([
      <div key={"action"}>
        <p className="font-bold">{`${agent.firstName} ${agent.lastName}`}</p>
        <p>{agent.phoneNumber}</p>
      </div>,
      agent.totalGames,
      `${agent.totalStake} Birr`,
      `${agent.totalIncome} Birr`,

      <div key={"action"} className="flex gap-2 w-full">
        <EditForm entity={agent} type="agent" />
        <ChangePassword user={agent} />
      </div>,
    ])
  );

  const totalCount = agentReport?.data?.data.total;
  const aggregate = agentReport?.data?.data?.aggregate;

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
        <p className="font-bold text-2xl">Agent Report</p>
        <div className="flex gap-2 ">
          <ReportFilter
            reportFilters={filters}
            setReportFilters={setFilters}
            options={{
              paginationFilters: true,
            }}
          />
          <div className="xl:hidden h-full bg-amber-300">
            <EditForm type="agent" />
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
        <AgentForm />
      </div>
    </div>
  );
};

export default Agents;
