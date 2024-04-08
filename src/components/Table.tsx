import React, { useRef, useEffect, forwardRef, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
  useExpanded,
} from "react-table";
import classNames from "classnames";

// components
import Pagination from "./Pagination";
import { Spinner } from "react-bootstrap";

interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  searchBoxClass: any;
}

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState<any>(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className={classNames(searchBoxClass)}>
      <span className="d-flex align-items-center">
        Search :{" "}
        <input
          type="search"
          value={value || ""}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="form-control w-auto ms-1"
        />
      </span>
    </div>
  );
};

interface IndeterminateCheckboxProps {
  indeterminate: any;
  children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    </>
  );
});

interface TableProps {
  isSearchable?: boolean;
  isSortable?: boolean;
  pagination?: boolean;
  isSelectable?: boolean;
  isExpandable?: boolean;
  sizePerPageList?: {
    text: string;
    value: number;
  }[];
  manualPagination?: boolean;
  manualSortBy?: boolean;
  columns: {
    Header: string;
    accessor: string;
    sort?: boolean;
    Cell?: any;
    className?: string;
  }[];
  data: any[];
  loading?: boolean;
  pageSize?: any;
  totalRows?: number;
  totalPages?: number;
  searchBoxClass?: string;
  tableClass?: string;
  theadClass?: string;
  fetchData?: (page: number, pageSize: number, orderType: boolean, orderBy: string) => void;
}

const Table = (props: TableProps) => {
  const isSearchable = props["isSearchable"] || false;
  const isSortable = props["isSortable"] || false;
  const pagination = props["pagination"] || false;
  const isSelectable = props["isSelectable"] || false;
  const isExpandable = props["isExpandable"] || false;
  const sizePerPageList = props["sizePerPageList"] || [];
  const fetchData = props["fetchData"];
  let otherProps: any = {};

  if (isSearchable) {
    otherProps["useGlobalFilter"] = useGlobalFilter;
  }
  if (isSortable) {
    otherProps["useSortBy"] = useSortBy;
  }
  if (isExpandable) {
    otherProps["useExpanded"] = useExpanded;
  }
  if (pagination) {
    otherProps["usePagination"] = usePagination;
  }
  if (isSelectable) {
    otherProps["useRowSelect"] = useRowSelect;
  }
  const dataTable = useTable(
    {
      columns: props["columns"],
      data: props["data"],
      initialState: { pageIndex: 0, pageSize: props["pageSize"] || 10 },
      manualPagination: props["manualPagination"] || false,
      pageCount: props["totalPages"],
      manualSortBy: props["manualSortBy"] || false,
      disableMultiSort: true,
    },
    otherProps.hasOwnProperty("useGlobalFilter") &&
    otherProps["useGlobalFilter"],
    otherProps.hasOwnProperty("useSortBy") && otherProps["useSortBy"],
    otherProps.hasOwnProperty("useExpanded") && otherProps["useExpanded"],
    otherProps.hasOwnProperty("usePagination") && otherProps["usePagination"],
    otherProps.hasOwnProperty("useRowSelect") && otherProps["useRowSelect"],
    (hooks) => {
      isSelectable &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);

      isExpandable &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            // Build our expander column
            id: "expander", // Make sure it has an ID
            Header: ({
              getToggleAllRowsExpandedProps,
              isAllRowsExpanded,
            }: any) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? "-" : "+"}
              </span>
            ),
            Cell: ({ row }) =>
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? "-" : "+"}
                </span>
              ) : null,
          },
          ...columns,
        ]);
    }
  );

  let rows = pagination ? dataTable.page : dataTable.rows;

  useEffect(() => {
    if (fetchData) {
      let r: any = {};
      r.page = dataTable.state.pageIndex + 1;
      r.pageSize = dataTable.state.pageSize;
      r.orderType = false;
      r.orderBy = '';
      if (dataTable.state.sortBy.length !== 0) {
        r.orderBy = dataTable.state.sortBy[0].id
        r.orderType = !dataTable.state.sortBy[0].desc
      }
      fetchData(r.page, r.pageSize, r.orderType, r.orderBy);
    }
  }, [fetchData, dataTable.state.sortBy, dataTable.state.pageIndex, dataTable.state.pageSize])

  return (
    <>
      {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={props["searchBoxClass"]}
        />
      )}
      <div className="table-responsive">
        <table
          {...dataTable.getTableProps()}
          className={classNames(
            "table table-centered react-table",
            props["tableClass"]
          )}
        >
          <thead className={props["theadClass"]}>
            {(dataTable.headerGroups || []).map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(headerGroup.headers || []).map((column: any) => (
                  <th
                    {...column.getHeaderProps(
                      column.sort && column.getSortByToggleProps()
                    )}
                    className={classNames({
                      sorting_desc: column.isSortedDesc === true,
                      sorting_asc: column.isSortedDesc === false,
                      sortable: column.sort === true,
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {props['loading'] ? (
            <tbody>
              {(dataTable.headerGroups || []).map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <td colSpan={headerGroup.headers.length} style={{ textAlign: 'center' }}>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Cargando...</span>
                    </Spinner>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody {...dataTable.getTableBodyProps()}>
              {(rows || []).map((row: any, i: number) => {
                dataTable.prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {(row.cells || []).map((cell: any) => {
                      return (
                        <td
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                            },
                          ])}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>)}
        </table>
      </div>
      {pagination && (
        <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />
      )}
    </>
  );
};

export default Table;
