import React, { useState } from "react";
import AgentForm from "../Forms/AgentForm";
import AgentTable from "./AgentTable";

import AppPagination from "@/components/AppPagination";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import { usePaginatedAgents } from "@/api/services/agentService";
import useToast from "@/hooks/useToast";
import { ERROR } from "@/constants/toast";

const Agents = () => {
  const { showMessage } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = usePaginatedAgents(currentPage, pageSize);

  const onPageChange = (_event, page) => setCurrentPage(page);
  const onPageSizeChange = (event) => {
    setCurrentPage(1);
    setPageSize(event.target.value);
  };

  if (isLoading) {
    return <ManagePageSkeleton />;
  }

  if (error) {
    showMessage(error?.message, { type: ERROR });
  }

  const totalCount = data?.data?.totalCount;
  const agents = data?.data?.data;

  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full">
      <div className="flex-1 bg-white p-5 md:p-10 rounded-lg">
        <AgentForm />
      </div>
      <div className="flex-[2] ">
        <div className="w-full rounded-lg overflow-auto self-start">
          <AgentTable agents={agents} />
        </div>
        {Boolean(totalCount) && (
          <AppPagination
            page={currentPage}
            onPageChange={onPageChange}
            count={Math.ceil(totalCount / pageSize)}
            limit={pageSize}
            onLimitChange={onPageSizeChange}
          />
        )}
      </div>
    </div>
  );
};

export default Agents;
