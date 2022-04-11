/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Offcanvas,
  Spinner,
  Row,
} from "react-bootstrap";
import { AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import useQuery from "../../hooks/useQuery";
import { getProductsAction } from "../../store/actions/products";
import CategoryList from "../Categories/category-list";
import ProductsList from "./products-list";

var phantom = {
  display: "block",
  padding: "20px",
  height: "70px",
  width: "100%",
};

const Products = () => {
  // let query = useQuery();
  const location = useLocation();
  // let catId = query.get("category");
  let catId = location.search.slice(10).replaceAll("%20", " ");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [parentCategory, setParentCatergory] = useState(false);
  const [Products, setProducts] = useState([]);
  useEffect(async () => {
    console.log("catId", catId);
    let filter = { category: { eq: catId } };
    dispatch(
      getProductsAction({
        category: catId,
        nextToken: "",
        limit: 10,
      })
    );
  }, [catId]);

  useEffect(() => {
    if (products.productList && products.productList.items) {
      setProducts(products.productList.items);
      if (products?.productList?.items[0]?.category === "Staples") {
        setParentCatergory(true);
      } else {
        setParentCatergory(false);
      }
    }
  }, [products.productList]);

  // eslint-disable-next-line no-array-constructor

  return (
    <>
      <Container
        fluid
        style={{ minHeight: "calc(100vh - 0px)" }}
      >
        <Row style={{ overflow: "auto" }}>
          <div style={{ ...phantom }} />
          <Card.Header className="products-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center w-100p">
                <p className="vl-page-title mb-0">{catId}</p>
                <div>
                  <small className="text-muted value-txt">
                    {Products.length} products found
                  </small>
                </div>
              </div>
              <div className="d-none">
                <Button
                  variant="outline-light"
                  active
                  size="lg"
                  style={{
                    background: "#F2CBBD",
                    borderColor: "#f0ead6 !important",
                  }}
                >
                  <AiOutlineSortAscending />
                </Button>
                <Button
                  variant="outline-light"
                  active
                  size="lg"
                  style={{
                    background: "#F2CBBD",
                    borderColor: "#f0ead6 !important",
                  }}
                >
                  <VscSettings />
                </Button>
              </div>
            </div>
          </Card.Header>
          <Col xs={12} lg={9} style={{ overflow: "auto", margin: "auto" }}>
            <Row>
              {products.loading ? (
                <Spinner
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    color: "#f05922 ",
                  }}
                  animation="border"
                  variant="primary"
                />
              ) : (
                <div>
                  {parentCategory ? (
                    <CategoryList list={products.productList.items} />
                  ) : (
                    <ProductsList
                      list={products.productList}
                      items={Products}
                    />
                  )}
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
