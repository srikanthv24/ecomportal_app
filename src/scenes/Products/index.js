import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { getProductsAction } from "../../store/actions/products";
import ProductsList from "./products-list";

var phantom = {
  display: "block",
  padding: "20px",
  height: "70px",
  width: "100%",
};
const Products = () => {
  let query = useQuery();
  let catId = query.get("category");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [Products, setProducts] = useState([])
  useEffect(async () => {
    console.log("catId", catId);
    let filter = { category: { eq: catId } };
    dispatch(getProductsAction({ nextToken: "", limit: 10 }));
  }, []);
  
  useEffect(() => {
    let temp = products && products.productList && products?.productList?.items || []
    setProducts([...Products, ...temp])
  }, [products.productList])
  return (
    <>
      <Container fluid>
        <Row style={{ overflow: "auto" }}>
          <div style={{ ...phantom }} />
          <Card.Header
            style={{
              position: "fixed",
              top: 118,
              zIndex: 999,
              background: "#f5f5f5",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="h5 m-0 p-0"> Products</p>
                <small className="text-muted">
                  {Products.length} products found
                </small>
              </div>
              <div>
                <Button variant="outline-light" active size="lg">
                  <AiOutlineSortAscending />
                </Button>
                <Button variant="outline-light" active size="lg">
                  <VscSettings />
                </Button>
              </div>
            </div>
          </Card.Header>
          <Col xs={12} lg={9} style={{ overflow: "auto" }}>
            <Row>
              <ProductsList list={products.productList} items={Products} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
