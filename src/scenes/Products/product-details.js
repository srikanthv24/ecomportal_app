import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../store/actions/products";
import { useParams } from "react-router-dom";
import ProductPlanner from "./product-planner";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [ProductDetails, setProductDetails] = useState({});
  const [CartItem, setCartItem] = useState(0);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id]);

  useEffect(() => {
    console.log("PROOROR", products.productDetails);
    setProductDetails(products.productDetails);
  }, [products.productDetails]);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} lg={6}>
          <p className="h4 mt-3">{ProductDetails.display_name}</p>
          <p className=" h6 text-muted">{ProductDetails.category}</p>

          <div
            style={{
              backgroundImage: `url(${
                ProductDetails.defaultimg_url ||
                "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "250px",
            }}
          />
        </Col>
        <Col sm={12} lg={6}>
          <p className="mt-3">{ProductDetails.description}</p>
          <h1>
            <small className="text-muted col-12 h6">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("Output", "")
                .replace("-", "")}
            </small>
            <br />
            <BiRupee /> {ProductDetails.saleprice} / {ProductDetails.uom_name}
          </h1>
        </Col>
      </Row>
      <Row>
        {/* <Col></Col> */}
        <Col>
          {products.productDetails.is_mealplan && <ProductPlanner
            customerId={"578461ea-bc50-4d40-8c0a-5c4546abc2d7"}
            productId={""}
            data={products.productDetails}
          />}
          <Button className="w-100" onClick={() => setCartItem(1)}>
            <AiOutlineShoppingCart />
            {"  "}Add to Cart
          </Button>

          {/* {!CartItem ? (
          ) : (
            <InputGroup className="mb-3">
              <Button
                variant="outline-secondary"
                onClick={() => setCartItem((qty) => Number(qty) - 1)}
              >
                <GrSubtract />
              </Button>
              <FormControl
                aria-label="Example text with two button addons"
                style={{ textAlign: "center" }}
                value={CartItem}
                type="number"
                onChange={(ev) => setCartItem(ev.target.value)}
              />

              <Button
                variant="outline-secondary"
                onClick={() => setCartItem((qty) => Number(qty) + 1)}
              >
                <GrAdd />
              </Button>
            </InputGroup>
          )} */}
        </Col>
      </Row>
      <div style={{ display: "block", height: 20 }} />
    </Container>
  );
};

export default ProductDetails;
