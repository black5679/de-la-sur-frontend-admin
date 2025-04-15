import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ProgressBar, Tab, Accordion } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Rating from "../../components/Rating";
import { useQuery } from "../../hooks";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IGetByIdProductResponse } from "../../responses/producto/get-by-id-producto.response";
import { getByIdProducto, getImageProducto } from "../../redux/actions";
import { FormInput } from "../../components";

interface Product {
  brand: string;
  name?: string;
  reviews: string;
  status: string;
  discount: number;
  price: number;
  description: string;
  rating: number;
  features: string[];
}

enum Mode {
  Crear = "crear",
  Modificar = "modificar",
  Visualizar = "visualizar",
}

// Stock Table
const Stocks = () => {
  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-centered mb-0">
          <thead className="table-light">
            <tr>
              <th>Outlets</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ASOS Ridley Outlet - NYC</td>
              <td>$139.58</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">27%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={27}
                      className="progress-sm"
                      variant="danger"
                    />
                  </div>
                </div>
              </td>
              <td>$1,89,547</td>
            </tr>
            <tr>
              <td>Marco Outlet - SRT</td>
              <td>$149.99</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">71%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={71}
                      className="progress-sm"
                      variant="success"
                    />
                  </div>
                </div>
              </td>
              <td>$87,245</td>
            </tr>
            <tr>
              <td>Chairtest Outlet - HY</td>
              <td>$135.87</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">82%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={82}
                      className="progress-sm"
                      variant="success"
                    />
                  </div>
                </div>
              </td>
              <td>$5,87,478</td>
            </tr>
            <tr>
              <td>Nworld Group - India</td>
              <td>$159.89</td>
              <td>
                <div className="row align-items-center g-0">
                  <div className="col-auto">
                    <span className="me-2">42%</span>
                  </div>
                  <div className="col">
                    <ProgressBar
                      now={42}
                      className="progress-sm"
                      variant="warning"
                    />
                  </div>
                </div>
              </td>
              <td>$55,781</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const DetalleProducto = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const mode: string = query.get("mode") || "";
  const id: string = query.get("id") ?? "";
  const { producto }: { producto: IGetByIdProductResponse } = useSelector(
    (state: RootState) => ({
      producto: state.Producto.producto,
    })
  );
  const getById = useCallback(
    (id: string) => {
      dispatch(getByIdProducto(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (mode === Mode.Modificar || mode === Mode.Visualizar) {
      getById(id);
    }
  }, [getById, mode, id]);

  const handleChangeGem = useCallback((
    subcategoryCode: string,
    categoryCode: string,
    spaceTypeCode: string
  ) => {
    let colors: string[] = [];
    producto.images = [];
    producto.spaceGems.forEach((space) => {
      if (space.spaceTypeCode === spaceTypeCode) {
        space.gemCategories.forEach((gemCategory) => {
          if (gemCategory.code === categoryCode) {
            gemCategory.gemSubcategories.forEach((gemSubcategory) => {
              if (gemSubcategory.code === subcategoryCode) {
                gemSubcategory.selected = true;
                colors.push(gemSubcategory.colorHex.replace("#", ""));
              } else {
                gemSubcategory.selected = false;
              }
            });
          } else {
            gemCategory.gemSubcategories.forEach((gemSubcategory) => {
              gemSubcategory.selected = false;
            });
          }
        });
      } else {
        space.gemCategories.forEach((gemCategory) => {
          gemCategory.gemSubcategories.forEach((gemSubcategory) => {
            if (gemSubcategory.selected) {
              colors.push(gemSubcategory.colorHex.replace("#", ""));
            }
          });
        });
      }
    });
    producto.spaceMetals.forEach((space) => {
      space.metalCategories.forEach((metalCategory) => {
        metalCategory.metalSubcategories.forEach((metalSubcategory) => {
          if (metalSubcategory.selected) {
            colors.push(metalSubcategory.colorHex.replace("#", ""));
          }
        });
      });
    });
    dispatch(getImageProducto("model", `${producto.id}/image/${colors.join(",")}.jpg`));
  },[producto, dispatch]);
  const handleChangeMetal = useCallback((
    subcategoryCode: string,
    categoryCode: string,
    spaceTypeCode: string
  ) => {
    let colors: string[] = [];
    producto.images = [];
    producto.spaceGems.forEach((space) => {
      space.gemCategories.forEach((gemCategory) => {
        gemCategory.gemSubcategories.forEach((gemSubcategory) => {
          if (gemSubcategory.selected) {
            colors.push(gemSubcategory.colorHex.replace("#", ""));
          }
        });
      });
    });
    producto.spaceMetals.forEach((space) => {
      if (space.spaceTypeCode === spaceTypeCode) {
        space.metalCategories.forEach((metalCategory) => {
          if (metalCategory.code === categoryCode) {
            metalCategory.metalSubcategories.forEach((metalSubcategory) => {
              if (metalSubcategory.code === subcategoryCode) {
                metalSubcategory.selected = true;
                colors.push(metalSubcategory.colorHex.replace("#", ""));
              } else {
                metalSubcategory.selected = false;
              }
            });
          } else {
            metalCategory.metalSubcategories.forEach((metalSubcategory) => {
              metalSubcategory.selected = false;
            });
          }
        });
      } else {
        space.metalCategories.forEach((metalCategory) => {
          metalCategory.metalSubcategories.forEach((metalSubcategory) => {
            if (metalSubcategory.selected) {
              colors.push(metalSubcategory.colorHex.replace("#", ""));
            }
          });
        });
      }
    });
    dispatch(getImageProducto("model", `${producto.id}/image/${colors.join(",")}.jpg`))
  },[producto, dispatch]);
  const [product] = useState<Product>({
    brand: "Jack & Jones",
    name: "Jack & Jones Men's T-shirt (Blue)",
    reviews: "36",
    status: "Instock",
    discount: 20,
    price: 80,
    description:
      "The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.",
    rating: 4.5,
    features: [
      "Sed ut perspiciatis unde",
      "Itaque earum rerum hic",
      "Nemo enim ipsam voluptatem",
      "Donec quam felis ultricies nec",
      "Temporibus autem quibusdam et",
    ],
  });

  const [discountPrice] = useState<number>(
    Math.round(product.price - (product.price * product.discount) / 100)
  );

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: "Producto",
            path: "/producto",
          },
          {
            label: "Detalle de Producto",
            path: "/producto/detalle",
            active: true,
          },
        ]}
        title={"Detalle de Producto"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={5}>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="producto_0_imagen"
                  >
                    <Tab.Content className="p-0">
                      {producto.images.map((image, index) => {
                        return (
                          <Tab.Pane
                            eventKey={`producto_${index}_imagen`}
                            key={index.toString()}
                          >
                            <img
                              src={image}
                              alt="imagen"
                              className="img-fluid mx-auto d-block rounded"
                            />
                          </Tab.Pane>
                        );
                      })}
                    </Tab.Content>
                  </Tab.Container>
                </Col>

                <Col lg={7}>
                  <div className="ps-xl-3 mt-3 mt-xl-0">
                    <h4 className="mb-3"> {producto.name}</h4>
                    <Rating value={product.rating} />
                    <p className="mb-4">
                      <Link to="#" className="text-muted">
                        ( {product.reviews} Customer Reviews )
                      </Link>
                    </p>
                    <h6 className="text-danger text-uppercase">
                      {product.discount}% Off
                    </h6>
                    <h4 className="mb-4">
                      Price :{" "}
                      <span className="text-muted me-2">
                        <del>${product.price} USD</del>
                      </span>{" "}
                      <b>${discountPrice} USD</b>
                    </h4>

                    <h4>
                      <span className="badge bg-soft-success text-success mb-4">
                        {product.status}
                      </span>
                    </h4>

                    <p className="text-muted mb-4">{producto.name}</p>
                    <Accordion defaultActiveKey="0">
                      {producto.spaceGems.map((spaceGem) => {
                        return (
                          <Accordion.Item
                            eventKey={spaceGem.spaceTypeCode.toString()}
                            key={spaceGem.spaceTypeCode}
                          >
                            <Accordion.Header>{spaceGem.name}</Accordion.Header>
                            <Accordion.Body>
                              {spaceGem.gemCategories.map((gemCategory) => {
                                return (
                                  <Accordion
                                    defaultActiveKey="0"
                                    key={gemCategory.code}
                                  >
                                    <Accordion.Item
                                      eventKey={spaceGem.spaceTypeCode.toString()}
                                      key={spaceGem.spaceTypeCode}
                                    ></Accordion.Item>
                                    <Accordion.Header>
                                      {gemCategory.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      {gemCategory.gemSubcategories.map(
                                        (gemSubcategory) => {
                                          return (
                                            <FormInput
                                              label={gemSubcategory.name}
                                              type="radio"
                                              checked={
                                                gemSubcategory.selected || false
                                              }
                                              value={gemSubcategory.code}
                                              name={
                                                gemSubcategory.code +
                                                "_" +
                                                spaceGem.spaceTypeCode
                                              }
                                              key={
                                                gemSubcategory.code +
                                                "_" +
                                                spaceGem.spaceTypeCode
                                              }
                                              onChange={() =>
                                                handleChangeGem(
                                                  gemSubcategory.code,
                                                  gemCategory.code,
                                                  spaceGem.spaceTypeCode
                                                )
                                              }
                                              containerClass={"col-12 mb-2"}
                                            />
                                          );
                                        }
                                      )}
                                    </Accordion.Body>
                                  </Accordion>
                                );
                              })}
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                      {producto.spaceMetals.map((spaceMetal) => {
                        return (
                          <Accordion.Item
                            eventKey={spaceMetal.spaceTypeCode.toString()}
                            key={spaceMetal.spaceTypeCode}
                          >
                            <Accordion.Header>
                              {spaceMetal.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              {spaceMetal.metalCategories.map(
                                (metalCategory) => {
                                  return (
                                    <Accordion
                                      defaultActiveKey="0"
                                      key={metalCategory.code}
                                    >
                                      <Accordion.Item
                                        eventKey={spaceMetal.spaceTypeCode.toString()}
                                        key={spaceMetal.spaceTypeCode}
                                      ></Accordion.Item>
                                      <Accordion.Header>
                                        {metalCategory.name}
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        {metalCategory.metalSubcategories.map(
                                          (metalSubcategory) => {
                                            return (
                                              <FormInput
                                                label={metalSubcategory.name}
                                                type="radio"
                                                checked={
                                                  metalSubcategory.selected ||
                                                  false
                                                }
                                                value={metalSubcategory.code}
                                                name={
                                                  metalSubcategory.code +
                                                  "_" +
                                                  spaceMetal.spaceTypeCode
                                                }
                                                key={
                                                  metalSubcategory.code +
                                                  "_" +
                                                  spaceMetal.spaceTypeCode
                                                }
                                                onChange={() =>
                                                  handleChangeMetal(
                                                    metalSubcategory.code,
                                                    metalCategory.code,
                                                    spaceMetal.spaceTypeCode
                                                  )
                                                }
                                                containerClass={"col-12 mb-2"}
                                              />
                                            );
                                          }
                                        )}
                                      </Accordion.Body>
                                    </Accordion>
                                  );
                                }
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                    <Row className="mb-3">
                      {(product.features || []).map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index % 2 === 0 ? (
                              <Col md={6}>
                                <p className="text-muted">
                                  <i className="mdi mdi-checkbox-marked-circle-outline h6 text-primary me-2"></i>
                                  {index % 2 === 0 && item}
                                </p>
                              </Col>
                            ) : (
                              <Col md={6}>
                                <p className="text-muted">
                                  <i className="mdi mdi-checkbox-marked-circle-outline h6 text-primary me-2"></i>
                                  {index % 2 !== 0 && item}
                                </p>
                              </Col>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Row>

                    <form className="d-flex flex-wrap align-items-center mb-4">
                      <label className="my-1 me-2" htmlFor="quantityinput">
                        Quantity
                      </label>
                      <div className="me-3">
                        <select className="form-select my-1" id="quantityinput">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>

                      <label className="my-1 me-2" htmlFor="sizeinput">
                        Size
                      </label>
                      <div className="me-sm-3">
                        <select className="form-select my-1" id="sizeinput">
                          <option defaultValue="0">Small</option>
                          <option value="1">Medium</option>
                          <option value="2">Large</option>
                          <option value="3">X-large</option>
                        </select>
                      </div>
                    </form>

                    <div>
                      <button type="button" className="btn btn-danger me-2">
                        <i className="mdi mdi-heart-outline"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                      >
                        <span className="btn-label">
                          <i className="mdi mdi-cart"></i>
                        </span>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>

              <Stocks />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetalleProducto;
