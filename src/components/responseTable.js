import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaSortAlphaDownAlt, FaSortAlphaDown } from "react-icons/fa";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

export default function ResponseTable({ questions, responses }) {
  const data = useMemo(() => responses, [responses]);
  const columns = useMemo(() => questions, [questions]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data }, useSortBy, usePagination);
  return (
    <>
      <table
        {...getTableProps()}
        className="border-2 border-slate-800 drop-shadow-xl min-w-[50%]"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border-2 border-slate-800 mb-3 shadow-xl bg-blue-400 text-white p-5"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortAlphaDownAlt className="inline mx-5" />
                      ) : (
                        <FaSortAlphaDown className="inline mx-5" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border-2 border-slate-800 bg-white p-5"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {pageOptions.length ? (
          <>
            <button onClick={() => previousPage()} hidden={!canPreviousPage}>
              <MdOutlineNavigateBefore className="text-2xl m-2" />
            </button>
            <button onClick={() => nextPage()} hidden={!canNextPage}>
              <MdOutlineNavigateNext className="text-2xl m-2" />
            </button>
          </>
        ) : (
          ""
        )}
        <div className="my-2">
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
        <select
          value={pageSize}
          className="my-2 form-select appearance-none drop-shadow-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
