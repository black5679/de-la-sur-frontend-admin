import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { IGetColorResponse } from "../../responses/color/get-color.response";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getColor } from "../../redux/color/actions";
import DetalleColorModal, { DetalleColorModalType } from "./DetalleColorModal";

/* name column render */
const NameColumn = ({ row }: { row: any }) => {
    return (
        <div className="d-flex">
            <div className="p-2 mb-2" style={{ backgroundColor: `#${row.original.codigoHex}` }} />
            <Link to="#" className="text-body fw-semibold" style={{ marginLeft: '8px', marginTop: '4px' }}>
                {row.original.nombre}
            </Link>
        </div>
    );
};

// main component
const Color = () => {
    const [show, setShow] = useState<boolean>(false);
    const [type, setType] = useState<DetalleColorModalType>(DetalleColorModalType.Registrar);
    const openRegisterModal = useCallback(() => {
        setType(DetalleColorModalType.Registrar);
        setShow(true);
    }, [])
    const openViewModal = useCallback(() => {
        setType(DetalleColorModalType.Visualizar);
        setShow(true);
    },[]);
    const openUpdateModal = useCallback(() => {
        setType(DetalleColorModalType.Modificar);
        setShow(true);
    },[]);
    const ActionColumn = useCallback(() => {
        return (
            <React.Fragment>
                <Link to="#" className="action-icon" onClick={openViewModal}>
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon" onClick={openUpdateModal}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        )
    }, [openUpdateModal, openViewModal])
    // columns to render
    const columns = [
        {
            Header: "Nombre",
            accessor: "nombre",
            sort: true,
            Cell: NameColumn,
            classes: "table-user",
        },
        {
            Header: "Hex",
            accessor: "codigoHex",
            sort: true
        },
        {
            Header: "Acciones",
            accessor: "acciones",
            sort: false,
            Cell: ActionColumn,
        },
    ];

    const dispatch = useDispatch<AppDispatch>();

    const { colores, loading }: { colores: IGetColorResponse[], loading: boolean } = useSelector(
        (state: RootState) => ({
            colores: state.Color.colores,
            loading: state.Color.loading
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
            value: colores.length,
        },
    ];

    const listar = useCallback(() => {
        dispatch(getColor());
    }, [dispatch])

    useEffect(() => {
        listar();
    }, [listar])

    const toggle = useCallback(() => {
        setShow(!show);
    }, [show])

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: "Color",
                        path: "/color",
                        active: true,
                    },
                ]}
                title={"Color"}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button className="btn btn-success mb-2" onClick={openRegisterModal}>
                                        <i className="mdi mdi-plus-circle me-2"></i> Registrar Color
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
                                data={colores}
                                loading={loading}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <DetalleColorModal show={show} toggle={toggle} type={type}></DetalleColorModal>
        </React.Fragment>
    );
};

export default Color;