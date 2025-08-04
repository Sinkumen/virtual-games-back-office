import React, { useEffect, useState } from "react";
import AppSelect from "../AppSelect/AppSelect";
import { Bars2Icon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import AppDatePicker from "../AppDatePicker";
import { dateRanges } from "@/dataset/dateRanges";
import AppMultipleSelect from "../AppMultipleSelect";
import AppButton from "../AppButton";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
} from "@mui/material";
import { useGetAgents } from "@/api/services/agentServices";
import { MdExpandMore } from "react-icons/md";
import { useGetShops } from "@/api/services/shopServices";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";

const orderOptions = [
  { id: 1, label: "ASC" },
  { id: 2, label: "DESC" },
];

const gameTypes = [
  { id: 1, title: "ALL" },
  { id: 2, title: "KENO" },
  { id: 3, title: "SPIN" },
];

const ticketStatuses = [
  { id: 1, title: "Placed" },
  { id: 2, title: "Redeemed" },
  { id: 3, title: "Unclaimed" },
  { id: 4, title: "Lost" },
  { id: 5, title: "Canceled" },
];

const ReportFilter = ({
  reportFilters = {},
  setReportFilters = () => {},
  isFetching,
  sortByOptions = [
    { id: 1, label: "No. of Games" },
    { id: 2, label: "Stake" },
    { id: 3, label: "Revenue" },
  ],
  options,
}) => {
  const { user } = useUserContext();
  const isAgent = user?.role === "agent";

  const [filters, setFilters] = useState(reportFilters);
  const [dateRange, setDateRange] = useState(dateRanges[0]);

  const { shopFilter, agentFilter, paginationFilters } = options || {};
  const {
    data: agentsResponse,
    isLoading: areAgentsLoading,
    error: agentsError,
  } = useGetAgents(!agentFilter || isAgent);

  const {
    data: shopsResponse,
    isLoading: areShopsLoading,
    error: shopsError,
  } = useGetShops(!shopFilter);

  const shops = shopsResponse?.data?.data?.shops;
  const agents = agentsResponse?.data?.data?.users;

  return (
    <Accordion
      className="ring-gray-300"
      sx={{
        width: "100%",
        boxShadow: "0",
        borderWidth: 1,
        borderColor: "rgb(209 213 219)",
        borderStyle: "solid",
      }}
      defaultExpanded={false}
      // defaultExpanded={window.innerWidth > 992}
    >
      <AccordionSummary
        sx={{
          "&.Mui-expanded": {
            minHeight: 10,
            height: 50,
          },
        }}
        expandIcon={<MdExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Filters
      </AccordionSummary>
      <AccordionDetails>
        <div className="ring-1 ring-gray-300 w-full p-4 flex flex-col gap-2 rounded-lg ">
          <div className=" mx-0 rounded-lg flex gap-2 w-full flex-col xl:flex-row">
            <AppSelect
              name="Date"
              Icon={CalendarDaysIcon}
              options={dateRanges}
              placeholder="Select date range."
              value={dateRange}
              onChange={(value) => {
                setDateRange(value);
                setFilters((prev) => ({
                  ...prev,
                  startDate: moment(value.startDate)
                    .startOf("day")
                    .utc()
                    .format(),
                  endDate: moment(value.endDate).endOf("day").utc().format(),
                }));
              }}
            />

            <AppDatePicker
              value={moment(filters?.startDate)._d}
              placeholder="Select start date"
              onChange={(newDate) => {
                setFilters((prev) => ({
                  ...prev,
                  startDate: moment(newDate).startOf("day").utc().format(),
                }));
              }}
              name={"from"}
              label={"From"}
            />
            <AppDatePicker
              value={moment(filters?.endDate)._d}
              placeholder="Select end date"
              onChange={(newDate) =>
                setFilters((prev) => ({
                  ...prev,
                  endDate: moment(newDate).endOf("day").utc().format(),
                }))
              }
              name={"to"}
              label={"To"}
            />

            {paginationFilters && (
              <AppSelect
                name="Sort By"
                Icon={Bars2Icon}
                options={sortByOptions}
                placeholder="Sort By"
                value={filters.sortBy}
                onChange={(newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: newValue,
                  }))
                }
              />
            )}

            {paginationFilters && (
              <AppSelect
                name="Order"
                Icon={BuildingStorefrontIcon}
                placeholder="Select order"
                options={orderOptions}
                value={filters.order}
                onChange={(newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    order: newValue,
                  }))
                }
              />
            )}
          </div>
          <div className=" mx-0 rounded-lg flex gap-2 w-full flex-col xl:flex-row">
            {shopFilter && (
              <>
                {!areShopsLoading ? (
                  <AppMultipleSelect
                    // name="Shops"
                    Icon={BuildingStorefrontIcon}
                    options={shops}
                    placeholder="Select Shops"
                    selected={filters.shops}
                    onChange={(newValues) =>
                      setFilters((prev) => ({
                        ...prev,
                        shops: newValues,
                      }))
                    }
                  />
                ) : (
                  <div className=" flex-1">
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={45}
                      className=""
                      width={"100%"}
                    />
                  </div>
                )}
              </>
            )}

            {agentFilter && !isAgent && (
              <>
                {!areAgentsLoading ? (
                  <AppMultipleSelect
                    // name="Agents"
                    Icon={BuildingStorefrontIcon}
                    options={agents}
                    placeholder="Agents"
                    selected={filters.shopOwner}
                    onChange={(newValues) =>
                      setFilters((prev) => ({
                        ...prev,
                        shopOwner: newValues,
                      }))
                    }
                  />
                ) : (
                  <div className=" flex-1">
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={45}
                      className=""
                      width={"100%"}
                    />
                  </div>
                )}
              </>
            )}

            <div className="flex-1 ">
              <AppButton
                disabled={!filters.startDate || !filters.endDate}
                onClick={() => setReportFilters(filters)}
                loading={isFetching}
                fullWidth
              >
                Apply Filter
              </AppButton>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReportFilter;
