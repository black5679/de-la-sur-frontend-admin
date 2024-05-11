import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { IGetMateriaPrimaResponse } from "../../responses/materia-prima/get-materia-prima.response";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getMateriaPrima } from "../../redux/actions";

/* name column render */
const NameColumn = ({ row }: { row: any }) => {
  return (
    <div className="table-user">
      <img src={row.original.avatar} alt="" className="me-2 rounded-circle" />
      <Link to="#" className="text-body fw-semibold">
        {row.original.nombre}
      </Link>
    </div>
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
    Header: "Materia Prima",
    accessor: "nombre",
    sort: true,
    Cell: NameColumn,
    classes: "table-user",
  },
  {
    Header: "Tipo",
    accessor: "tipoMateriaPrima",
    sort: true,
  },
  {
    Header: "Categoría",
    accessor: "categoriaMateriaPrima",
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
const MateriaPrima = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { materiasPrimas, loading }: { materiasPrimas: IGetMateriaPrimaResponse[], loading: boolean } = useSelector(
      (state: RootState) => ({
        materiasPrimas: state.MateriaPrima.materiasPrimas,
        loading: state.MateriaPrima.loading
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
      value: materiasPrimas.length,
    },
  ];
  useEffect(() => {
    dispatch(getMateriaPrima());
  }, [dispatch])
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "Materia Prima",
            path: "/materia-prima",
            active: true,
          },
        ]}
        title={"Materia Prima"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                manualPagination={false}
                manualSortBy={false}
                data={materiasPrimas}
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
    </React.Fragment>
  );
};

export default MateriaPrima;
