import React from "react";
import EmptyDataPlaceholder from "../EmptyDataPlaceholder";
import RoleWrapper from "../RoleWrapper";

const AppTable = ({
  columns = [],
  rows = [],
  dense = false,
  className,
  stickyFirstColumn,
}) => {
  return (
    <TableWrapper>
      <div className={`absolute w-full ${className}`}>
        <TableBody
          rows={rows}
          columns={columns}
          dense={dense}
          stickyFirstColumn={stickyFirstColumn}
        />
      </div>
      <div className={`invisible w-1 ${className}`}>
        <TableBody rows={rows} columns={columns} dense={dense} />
      </div>
    </TableWrapper>
  );
};

const TableBody = ({
  columns = [],
  rows = [],
  dense = false,
  stickyFirstColumn,
}) => {
  return (
    <div className={`w-full overflow-x-auto `}>
      <table className="min-w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns.map((column, i) => (
              <RoleWrapper key={column.id} allowedRoles={column?.allowedRoles}>
                <th
                  key={column.id}
                  scope="col"
                  className={`${
                    stickyFirstColumn && i === 0
                      ? "sticky left-0 bg-gray-50"
                      : ""
                  } py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6 font-semibold whitespace-nowrap`}
                >
                  {column.name}
                </th>
              </RoleWrapper>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {rows?.map((row, i) => (
            <tr key={i} className="even:bg-gray-50 odd:bg-white">
              {row?.map((cell, j) => (
                <td
                  key={j}
                  className={`whitespace-nowrap ${
                    stickyFirstColumn && j === 0
                      ? "sticky left-0 bg-inherit"
                      : ""
                  }  ${
                    dense ? "py-3" : "py-4"
                  } pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!rows?.length && <EmptyDataPlaceholder />}
    </div>
  );
};

const TableWrapper = ({ children }) => {
  return (
    <div className="relative rounded-xl bg-slate-300/30 border border-slate-300 overflow-auto">
      {children}
    </div>
  );
};

export default AppTable;
