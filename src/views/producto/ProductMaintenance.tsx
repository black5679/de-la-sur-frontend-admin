import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "react-draft-wysiwyg";
import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput } from "../../components/";
import { getByIdProductType, initRegisterProduct } from "../../redux/actions";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IGetProductTypeResponse } from "../../responses/product-type/get-product-type.response";
import TreeView from "../../components/TreeView";

const ProductMaintenance = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  // Estructura de datos para el árbol
  // const nodes : Node[] = [
  //   {
  //     value: 'parent1',
  //     label: 'Parent 1',
  //     children: [
  //       { value: 'child1-1', label: 'Child 1-1' },
  //       { value: 'child1-2', label: 'Child 1-2' }
  //     ]
  //   },
  //   {
  //     value: 'parent2',
  //     label: 'Parent 2',
  //     children: [
  //       { value: 'child2-1', label: 'Child 2-1' },
  //       { value: 'child2-2', label: 'Child 2-2' }
  //     ]
  //   }
  // ];
  const dispatch = useDispatch<AppDispatch>();
  const init = useCallback(
    () => {
      dispatch(initRegisterProduct());
    },
    [dispatch]
  );

  useEffect(() => {
    init();
  }, [init]);

  const [editorState, setEditorState] = useState<any>();
  const { productTypes, nodes }: { productTypes: IGetProductTypeResponse[], nodes: Node[] } = useSelector(
    (state: RootState) => ({
      productTypes: state.Producto.productTypes,
      nodes: state.Producto.nodes
    })
  );
  console.log(nodes)
  const handleChangeProductType = useCallback(
    (e) => {
      const id = e.value;
      dispatch(getByIdProductType(id));
    },
    [dispatch]
  );


  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Ingrese un nombre"),
      file: yup.mixed()
        .test('required', 'Este campo es obligatorio', (value) => {
          return value && value[0];  // Si no hay archivo, falla la validación
        })
        .test('fileSize', 'El archivo es demasiado grande', (value) => {
          if (!value || !value[0]) return true;  // Si no hay archivo, pasa la validación
          return value[0].size <= 1024 * 1024; // 1MB máximo
        })
        .test('fileType', 'Solo se permiten imágenes (JPG, PNG)', (value) => {
          if (!value || !value[0]) return true;  // Si no hay archivo, pasa la validación
          return ['image/jpeg', 'image/png'].includes(value[0].type);
        }),
      productTypeId: yup.string().required("Ingrese un tipo")
    })
  );

  /*
   * form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  /**
   * On editor body change
   */
  const onEditorStateChange = (editorStates: any) => {
    setEditorState(editorStates);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/ecommerce/details" },
          {
            label: "Add / Edit Product",
            path: "/apps/ecommerce/details",
            active: true,
          },
        ]}
        title={"Add / Edit Product"}
      />

      <form onSubmit={handleSubmit(() => { })}>
        <Row>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                  General
                </h5>
                <FormInput
                  name="name"
                  label="Nombre"
                  placeholder="e.g : Apple iMac"
                  containerClass={"mb-3"}
                  register={register}
                  key="productname"
                  errors={errors}
                  control={control}
                />
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName border border-1"
                    editorClassName="editorClassName px-2"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{ minHeight: "150px" }}
                  />
                </Form.Group>
                <FormInput
                  type="select"
                  name="productTypeId"
                  label="Tipo"
                  containerClass={"col-6 mb-2"}
                  register={register}
                  key="productTypeId"
                  isMulti={false}
                  hideSelectedOptions={false}
                  closeMenuOnSelect={true}
                  onChange={handleChangeProductType}
                  errors={errors}
                  control={control}
                  options={productTypes.map((material: IGetProductTypeResponse) => { return { value: material.id, label: material.name } })}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <TreeView></TreeView>
              <CheckboxTree
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        onCheck={setChecked}
        onExpand={setExpanded}
        icons={{
          check: <span>✔️</span>,
          uncheck: <span>❌</span>,
          halfCheck: <span>➖</span>,
          expandOpen: <span style={{ fontSize: '18px', color: 'green' }}>▼</span>, // Ícono para expandir
          expandClose: <span style={{ fontSize: '18px', color: 'red' }}>►</span>
        }}
      />
                <h5 className="text-uppercase mt-0 mb-3 bg-light p-2">
                  Modelo en Blender
                </h5>
                <FormInput
                  type="file"
                  name="file"
                  label="Archivo"
                  key="file"
                  containerClass={"mb-3"}
                  register={register}
                  errors={errors}
                  control={control}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="text-center mb-3">
              <button
                type="button"
                className="btn w-sm btn-light waves-effect me-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn w-sm btn-success waves-effect waves-light me-1"
              >
                Save
              </button>
              <button
                type="button"
                className="btn w-sm btn-danger waves-effect waves-light me-1"
              >
                Delete
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default ProductMaintenance;
