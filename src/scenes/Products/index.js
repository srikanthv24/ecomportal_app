import React, { useEffect } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { getProductsAction } from "../../store/actions/products";
import ProductsList from "./products-list";

const Products = () => {
  let query = useQuery();
  let catId = query.get("category");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  //   const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    let filter = { category: { eq: catId } };
    dispatch(getProductsAction(catId ? {filter: filter} : 0));
    console.log("catId", catId);
  }, []);

  return (
    <>
      <Container fluid>
        <Row style={{ overflow: "auto" }}>
          {/* <Col lg={3} style={{ borderLeft: "1px solid grey" }}>
            FILTER
          </Col> */}
          <Col
            xs={12}
            lg={9}
            style={{ overflow: "auto",  }}
          >
            <Row>
              <ProductsList list={products.productList} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
