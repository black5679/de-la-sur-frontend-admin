import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";
import { IGetPaginateProductoRequest } from "../../requests/tarifa/get-paginate-producto.request";
import { GetPaginateTarifaRequest } from "../../requests/tarifa/get-paginate-tarifa.request";
import { getPaginateProducto } from "../../redux/producto/actions";

/* name column render */
const NameColumn = ({ row }: { row: any }) => {
    return (
        <div className="table-user">
            <img src={row.original.avatar} alt="" className="me-2 rounded-circle" />
            <Link to="#" className="text-body fw-semibold">
                {row.original.name}
            </Link>
        </div>
    );
};

/* last order column render */
const LastOrderColumn = ({ row }: { row: any }) => {
    return (
        <>
            {row.original.last_order.date}{" "}
            <small className="text-muted">{row.original.last_order.time}</small>
        </>
    );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
    return (
        <React.Fragment>
            <span
                className={classNames("badge", {
                    "badge-soft-success": row.original.status === "Active",
                    "badge-soft-danger": row.original.status === "Blocked",
                })}
            >
                {row.original.status}
            </span>
        </React.Fragment>
    );
};

/* action column render */
const ActionColumn = () => {
    return (
        <React.Fragment>
            <Link to="#" className="action-icon">
                {" "}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="#" className="action-icon">
                {" "}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon">
                {" "}
                <i className="mdi mdi-delete"></i>
            </Link>
        </React.Fragment>
    );
};

// columns to render
const columns = [
    {
        Header: "Customer",
        accessor: "name",
        sort: true,
        Cell: NameColumn,
        classes: "table-user",
    },
    {
        Header: "Phone",
        accessor: "phone",
        sort: true,
    },
    {
        Header: "Balance",
        accessor: "balance",
        sort: true,
    },
    {
        Header: "Orders",
        accessor: "orders",
        sort: true,
    },
    {
        Header: "Last Order",
        accessor: "last_order",
        sort: true,
        Cell: LastOrderColumn,
    },
    {
        Header: "Status",
        accessor: "status",
        sort: true,
        Cell: StatusColumn,
    },
    {
        Header: "Action",
        accessor: "action",
        sort: false,
        Cell: ActionColumn,
    },
];

// main component
const Producto = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [request, setRequest] = useState<IGetPaginateProductoRequest>(new GetPaginateTarifaRequest());
    // const [filter, setFilter] = useState<IFilter>({ materiales: "" });

    const { productos, loading }: { productos: PaginateResponse<IGetProductoResponse>, loading: boolean } = useSelector(
        (state: RootState) => ({
            productos: state.Tarifa.productos,
            loading: state.Tarifa.loading,
        })
    );

    // give page size
    const sizePerPageList = [
        {
            text: "10",
            value: 10,
        },
        {
            text: "25",
            value: 25,
        },
        {
            text: "All",
            value: productos.totalRows,
        }
    ];
    const fetchData = useCallback((page: number, pageSize: number, orderType: boolean, orderBy: string) => {
        dispatch(getPaginateProducto({ ...request, page, pageSize, orderType, orderBy }));
      }, [dispatch, request])
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: "Ecommerce", path: "/apps/ecommerce/customers" },
                    {
                        label: "Customers",
                        path: "/apps/ecommerce/customers",
                        active: true,
                    },
                ]}
                title={"Customers"}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Customer
                                    </Button>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={productos.results}
                                pageSize={request.pageSize}
                                totalRows={productos.totalRows}
                                totalPages={productos.totalPages}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                manualPagination={true}
                                manualSortBy={true}
                                fetchData={fetchData}
                                loading={loading}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Producto;