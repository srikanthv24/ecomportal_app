/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GiMeal } from "react-icons/gi";
import "./styles.css";
import { Card, Col, Container, Button, Row } from "react-bootstrap";
import SimpleCard from "../../components/card/simple-card";
import LandingCarousel from "../../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/products";
import { getCategories } from "../../store/actions/categories";
import { Link } from "react-router-dom";
import CategoryList from "../Categories/category-list";
import HomeContent from "../Home/index";
import FooterContent from "../Footer/index";
import StoreContent from "../../components/StoreContent"

const Landing = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductsAction({ limit: 10, nextToken: "" }));
    dispatch(getCategories({ limit: 40, nextToken: "" }));
  }, []);

  // eslint-disable-next-line no-array-constructor
  let dummyList = new Array(10, {});

  console.log("categories-TEMP", categories);
  return (
    <section>
    <HomeContent />
    <Container fluid className="content-body" style={{background: "#F2CBBD", paddingBottom:'2rem'}}>
      {userDetails.sub && (
        <section className="page-content bg-1 pt-4">
          <SimpleCard />
        </section>
      )}

      <section className="page-content1 py-3 bg-1">
    

      <Container style={{background: "#F2CBBD"}}>
          {/* <Button className="w-100" onClick={() => history.push("/subscription/")}>
            
          </Button> */}
        <StoreContent />
        </Container>
        <Container style={{background: "#F2CBBD"}}>
          {/* <Button className="w-100" onClick={() => history.push("/subscription/")}>
            
          </Button> */}
           <Card style={{ border: "none", background: "transparent" }}>
            <Card.Header className="no-bg1" style={{background: "#F2CBBD"}}>
              <div className="w-100">
                <Link to="/subscription" className="viewall-txt">
                  <Button
                    style={{ background: "#f05922", borderColor: "#f05910" }}
                    className="w-100 bg-chocolate-900"
                  >
                    <GiMeal size="30" /> Choose my meal
                  </Button>
                </Link>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="content-title">Categories</span>
                <span>
                  {/* </span>

                <span> */}
                  <Link to="/categories" className="viewall-txt mb-0">
                    View all
                  </Link>
                </span>
              </div>
            </Card.Header>
            <Card.Body className="m-0 p-0" style={{background: "#F2CBBD"}}>
              {/* <LandingCarousel carouselItems={categories.categories} /> */}
              {categories.loading ? (
                <Row
                style={{ width: "100%" }}
                className="p-0 m-0 d-flex align-items-center justify-content-center"
              >
                {dummyList.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      lg={3}
                      md={4}
                      sm={6}
                      xs={6}
                      className="mt-1 mb-2"
                    >
                      <div className="category-item1">
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
                          className="placeholder-glow1"
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
                              className="placeholder-glow1"
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
                            {/* <p className="text-muted1 placeholder-glow1">
                              <span className="placeholder1 col-12">
                                SAMPLE DATA.....
                              </span>
                            </p> */}
                            <h6
                      style={{
                        fontSize:'20px',
                        fontFamily: "Playfair Display,serif",
                        fontWeight:700,
                        lineHeight:"25px",
                        textOverflow: "ellipsis",
                        color: "#352817",
                      }}
                    >
                      SAMPLE DATA.....
                    </h6>
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
      <hr className="hr-divider" />
      <section className="page-content1 bg-1">
        <Container>
          <Card style={{ border: "none", background: "transparent" }}>
            <Card.Header className="no-bg">
              <div className="d-flex justify-content-between align-items-baseline">
                <span className="content-title">Products</span>
                <span>
                  <Link to="/products" className="viewall-txt mb-0">
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
    <FooterContent />
    </section>
  );
};

export default Landing;
