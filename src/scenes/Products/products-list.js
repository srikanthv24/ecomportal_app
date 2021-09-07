import React from "react";
import { Button, Card, Col, Navbar, Row } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";
import ProductCard from "./product-card";

var phantom = {
  display: "block",
  padding: "20px",
  height: "70px",
  width: "100%",
};
const ProductsList = ({ list }) => {
  console.log("listlist", list);

  if (!list.length) {
    return <h3>No products found!!</h3>;
  }
  return (
    <>
      <Card.Header
        style={{ position: "fixed", top: 118, zIndex: 999, background: "#f5f5f5" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="h5 m-0 p-0"> Products</p>
            <small className="text-muted">{list.length} products found</small>
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
      <div style={{ ...phantom }} />

      {list.length &&
        list.map((item) => {
          return item ? (
            <Col lg={4} md={4} sm={6} xs={6} key={item.id} className="m-0 p-1">
              <ProductCard product={item} />
            </Col>
          ) : null;
        })}
    </>
  );
};

export default ProductsList;
