import React from "react";
import { Col, Row } from "react-bootstrap";
import shopIcon from "./../../assets/logos/004-shop.png";
import searchIcon from "./../../assets/logos/001-loupe.png";
import accountIcon from "./../../assets/logos/002-account.png";

var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  zIndex: "999",
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "10px",
  width: "100%",
};

const Footer = ({ children }) => {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <Row>
          <Col>
            <img
              src={shopIcon}
              width="20%"
            />
          </Col>
          <Col>
            <img src={searchIcon} width="20%" />
          </Col>
          <Col>
            <img src={accountIcon} width="20%" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
