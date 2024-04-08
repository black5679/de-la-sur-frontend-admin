import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IGetTarifaResponse } from "../../responses/tarifa/get-tarifa.response";
import { getMaterial, getPaginateTarifa } from "../../redux/actions";
import { PaginateResponse } from "../../base/paginate.response";
import { GetPaginateTarifaRequest, IGetPaginateTarifaRequest } from "../../requests/tarifa/get-paginate-tarifa.request";
import { FormInput, VerticalForm } from "../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IGetMaterialResponse } from "../../responses/material/get-material.response";

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
    Header: "Material",
    accessor: "material",
    sort: true,
  },
  {
    Header: "Fuente",
    accessor: "fuente",
    sort: true,
  },
  {
    Header: "Forma",
    accessor: "forma",
    sort: true,
  },
  {
    Header: "Pureza",
    accessor: "pureza",
    sort: true,
  },
  {
    Header: "Peso",
    accessor: "peso",
    sort: true,
  },
  {
    Header: "Precio",
    accessor: "precio",
    sort: true,
  },
  {
    Header: "Acciones",
    accessor: "acciones",
    sort: false,
    Cell: ActionColumn,
  },
];

interface IFilter {
  materiales?: string;
}

// main component
const Customers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [request, setRequest] = useState<IGetPaginateTarifaRequest>(new GetPaginateTarifaRequest());
  const [filter, setFilter] = useState<IFilter>({ materiales: "" });

  const { tarifas, loading, materiales }: { tarifas: PaginateResponse<IGetTarifaResponse>, loading: boolean, materiales: IGetMaterialResponse[] } = useSelector(
    (state: RootState) => ({
      tarifas: state.Tarifa.tarifas,
      loading: state.Tarifa.loading,
      materiales: state.Material.materiales
    })
  );

  const filtrar = useCallback(() => {
    setRequest((prevState) => ({ ...prevState, materiales: filter.materiales }));
  }, [filter])

  const fetchData = useCallback((page: number, pageSize: number, orderType: boolean, orderBy: string) => {
    dispatch(getPaginateTarifa({ ...request, page, pageSize, orderType, orderBy }));
  }, [dispatch, request])

  const schemaResolver = yupResolver(
    yup.object({
      materiales: yup.array().optional()
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
      value: tarifas.totalRows,
    },
  ];

  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

  const setMateriales = useCallback((e: any) => {
    const materiales = e.map((e: any) => e.value).join(',');
    setFilter((prevState: any) => ({ ...prevState, materiales }))
  }, [])

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
        title={"Tarifa"}
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
              <Container>
                <VerticalForm formClass="row" onSubmit={filtrar} resolver={schemaResolver}>
                  <FormInput
                    label="Materiales"
                    type="select"
                    name="materiales"
                    containerClass={"col-6 mb-2"}
                    isMulti={true}
                    hideSelectedOptions={false}
                    closeMenuOnSelect={true}
                    onChange={setMateriales}
                    options={materiales.map((material: IGetMaterialResponse) => { return { value: material.idMaterial, label: material.nombre } })}
                    value={materiales.filter((material: IGetMaterialResponse) => (filter.materiales?.split(",") || []).includes(material.idMaterial.toString())).map((material: IGetMaterialResponse) => { return { value: material.idMaterial, label: material.nombre } })}
                  ></FormInput>
                  <div className="text-end">
                    <Button variant="primary" type="submit">
                      Buscar
                    </Button>
                  </div>
                </VerticalForm>
              </Container>
              <Table
                columns={columns}
                data={tarifas.results}
                pageSize={request.pageSize}
                totalRows={tarifas.totalRows}
                totalPages={tarifas.totalPages}
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

export default Customers;
