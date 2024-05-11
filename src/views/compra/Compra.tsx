import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GetPaginateCompraRequest, IGetPaginateCompraRequest } from "../../requests/compra/get-paginate-compra.request";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetCompraResponse } from "../../responses/compra/get-compra.response";
import { getPaginateCompra } from "../../redux/actions";

/* order column render */
const OrderColumn = ({ row }: { row: any }) => {
    return (
        <>
            <Link to="/apps/ecommerce/order/details" className="text-body fw-bold">
                #BM{row.original.order_id}
            </Link>
        </>
    );
};

/* orderdate column render */
const OrderDateColumn = ({ row }: { row: any }) => {
    return (
        <>
            {row.original.order_date}{" "}
            <small className="text-muted">{row.original.order_time}</small>
        </>
    );
};

/* payment column render */
const PaymentStatusColumn = ({ row }: { row: any }) => {
    return (
        <>
            <h5>
                <span
                    className={classNames("badge", {
                        "bg-soft-success text-success":
                            row.original.payment_status === "Paid",
                        "bg-soft-danger text-danger":
                            row.original.payment_status === "Payment Failed",
                        "bg-soft-info text-info": row.original.payment_status === "Unpaid",
                        "bg-soft-warning text-warning":
                            row.original.payment_status === "Awaiting Authorization",
                    })}
                >
                    {row.original.payment_status === "Paid" && (
                        <i className="mdi mdi-bitcoin me-1"></i>
                    )}
                    {row.original.payment_status === "Payment Failed" && (
                        <i className="mdi mdi-cancel me-1"></i>
                    )}
                    {row.original.payment_status === "Unpaid" && (
                        <i className="mdi mdi-cash me-1"></i>
                    )}
                    {row.original.payment_status === "Awaiting Authorization" && (
                        <i className="mdi mdi-timer-sand me-1"></i>
                    )}
                    {row.original.payment_status}
                </span>
            </h5>
        </>
    );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
    return (
        <>
            <h5>
                <span
                    className={classNames("badge", {
                        "bg-success": row.original.order_status === "Delivered",
                        "bg-danger": row.original.order_status === "Cancelled",
                        "bg-info": row.original.order_status === "Shipped",
                        "bg-warning": row.original.order_status === "Processing",
                    })}
                >
                    {row.original.order_status}
                </span>
            </h5>
        </>
    );
};

/* action column render */
const ActionColumn = () => {
    return (
        <>
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
        </>
    );
};

// get all columns
const columns = [
    {
        Header: "ID Orden",
        accessor: "idCompra",
        Cell: OrderColumn,
    },
    {
        Header: "Date",
        accessor: "order_date",
        Cell: OrderDateColumn,
    },
    {
        Header: "Payment Status",
        accessor: "payment_status",
        Cell: PaymentStatusColumn,
    },
    {
        Header: "Total",
        accessor: "total",
    },
    {
        Header: "Payment Method",
        accessor: "payment_method",
    },
    {
        Header: "Order Status",
        accessor: "order_status",
        Cell: StatusColumn,
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: ActionColumn,
    },
];

// get pagelist to display
const sizePerPageList = [
    {
        text: "10",
        value: 10,
    },
    {
        text: "20",
        value: 20,
    },
    {
        text: "50",
        value: 50,
    },
];

// main component
const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [request, setRequest] = useState<IGetPaginateCompraRequest>(new GetPaginateCompraRequest());
    
    const { compras, loading }: { compras: PaginateResponse<IGetCompraResponse>, loading: boolean } = useSelector(
        (state: RootState) => ({
            compras: state.Compra.compras,
            loading: state.Compra.loading
        })
    );
    const fetchData = useCallback((page: number, pageSize: number, orderType: boolean, orderBy: string) => {
        dispatch(getPaginateCompra({ ...request, page, pageSize, orderType, orderBy }));
      }, [dispatch, request])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Orden de Compra", path: "/compra", active: true },
                ]}
                title={"Orden de Compra"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={compras.results}
                                pageSize={request.pageSize}
                                totalRows={compras.totalRows}
                                totalPages={compras.totalPages}
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
        </>
    );
};

export default Orders;