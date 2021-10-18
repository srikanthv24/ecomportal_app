import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import "./styles.css";
import { Alert, Card, Col, Container, Button, Row, Badge } from "react-bootstrap";
import SimpleCard from "../../components/card/simple-card";
import LandingCarousel from "../../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/products";
import { getCategories } from "../../store/actions/categories";
import { Link, useHistory } from "react-router-dom";
import CategoryList from "../Categories/category-list";

const Landing = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductsAction({ limit: 10, nextToken: "", category: "" }));
    dispatch(getCategories({ limit: 40, nextToken: "" }));
  }, []);
  let dummyList = new Array(10, {});

  console.log("categories-TEMP", categories);
  return (
    <Container fluid="sm" className="content-body">
      <section className="page-content bg-1">
        <SimpleCard />
      </section>

      <section className="page-content py-3">
        <Container>
          {/* <Button className="w-100" onClick={() => history.push("/subscription/")}>
            
          </Button> */}
          <Card style={{ border: "none" }}>
            <Card.Header className="no-bg">
              <div className="d-flex justify-content-between">
                <span className="content-title">Categories</span>

                <span>
                  <Link to="/subscription" className="viewall-txt">
                    <Badge bg="secondary">Choose my meal</Badge>
                  </Link>
                </span>

                <span>
                  <Link to="/categories" className="viewall-txt">
                    View all
                  </Link>
                </span>
              </div>
            </Card.Header>
            <Card.Body className="m-0 p-0">
              {/* <LandingCarousel carouselItems={categories.categories} /> */}
              {categories.loading ? (
                <Row
                  style={{ width: "100%" }}
                  className="p-0 m-0 d-flex align-items-center justify-content-center"
                >
                  {dummyList.map(() => {
                    return (
                      <Col
                        key={"letmetry"}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={6}
                        className="mt-1 mb-2"
                      >
                        <div className="category-item">
                          <div
                            style={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              //   background: "#ccc",
                              height: "100%",
                              boxSizing: "border-box",
                            }}
                            className="placeholder-glow"
                          >
                            <div style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  backgroundImage: `url(${"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"})`,
                                  backgroundSize: "cover",
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  height: "120px",
                                  width: "120px",
                                  borderRadius: "10%",
                                  margin: 5,
                                  textAlign: "center",
                                }}
                                className="placeholder-glow"
                              />
                            </div>
                            <div
                              style={{
                                height: 50,
                                maxHeight: 50,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <p className="text-muted placeholder-glow">
                                <span class="placeholder col-12">
                                  SAMPLE DATA.....
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <CategoryList list={categories.categories} />
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>

      <section className="page-content bg-3">
        <Container>
          <Card style={{ border: "none", backgroundColor: "transparent" }}>
            <Card.Header className="no-bg">
              <div className="d-flex justify-content-between align-items-baseline">
                <span className="content-title">Products</span>
                <span>
                  <Link to="/products" className="viewall-txt">
                    View all
                  </Link>
                </span>
              </div>
            </Card.Header>
            <Card.Body className="m-0 p-1">
              <LandingCarousel
                multiItem
                carouselItems={products?.productList?.items || []}
                loading={products.loading}
              />
            </Card.Body>
          </Card>
        </Container>
      </section>
    </Container>
  );
};

export default Landing;
