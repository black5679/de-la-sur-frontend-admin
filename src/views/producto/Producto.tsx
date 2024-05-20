import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";
import { IGetPaginateProductoRequest } from "../../requests/producto/get-paginate-producto.request";
import { GetPaginateTarifaRequest } from "../../requests/tarifa/get-paginate-tarifa.request";
import { getPaginateProducto } from "../../redux/producto/actions";

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
        Header: "Producto",
        accessor: "nombre",
        sort: true
    },
    {
        Header: "Categoría",
        accessor: "categoriaProducto",
        sort: true,
    },
    {
        Header: "Acciones",
        accessor: "action",
        sort: false,
        Cell: ActionColumn,
    },
];

// main component
const Producto = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [request] = useState<IGetPaginateProductoRequest>(new GetPaginateTarifaRequest());
    // const [filter, setFilter] = useState<IFilter>({ materiales: "" });

    const { productos, loading }: { productos: PaginateResponse<IGetProductoResponse>, loading: boolean } = useSelector(
        (state: RootState) => ({
            productos: state.Producto.productos,
            loading: state.Producto.loading,
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