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
import { MdFavoriteBorder } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../store/actions/products";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [ProductDetails, setProductDetails] = useState({});
  const [CartItem, setCartItem] = useState(0);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  useEffect(() => {
    console.log("PROOROR", products.productDetails);
    setProductDetails(products.productDetails);
  }, [products.productDetails]);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} lg={6}>
          <img
            src={
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            }
            height="100%"
            width="100%"
          />
        </Col>
        <Col sm={12} lg={6}>
          <h2 className="text-muted mt-4">{ProductDetails.display_name}</h2>
          <h4>{ProductDetails.category}</h4>
          <h3>{ProductDetails.description}</h3>
          <h1>
            <BiRupee /> {ProductDetails.saleprice} / {ProductDetails.uom_name}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="w-100" variant="danger">
            <MdFavoriteBorder />
            Wishlist
          </Button>
        </Col>
        <Col>
          {!CartItem ? (
            <Button className="w-100" onClick={() => setCartItem(1)}>
              <AiOutlineShoppingCart />
              {"  "}Add to Cart
            </Button>
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
