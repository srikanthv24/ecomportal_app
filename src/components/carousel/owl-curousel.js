import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Col, Row } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./styles.css";
import { useHistory } from "react-router-dom";
import ProductCard from "../../scenes/Products/product-card";

const OwlCurousel = ({ carouselItems }) => {
  let history = useHistory();
  console.log("OWL_CAROUSEL", carouselItems);

  let responsive = {
    0: {
      items: 2,
    },
    450: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  };
  return (
    <div>
      <ReactOwlCarousel
        loop
        margin={5}
        center
        autoPlay
        responsive={{ ...responsive }}
      >
        {carouselItems.map((item) => (
          <Row
            key={item.id}
            onClick={() => history.push(`/products/${item.id}`)}
          >
            <Col lg={6} sm={12} xs={12}>
              <div className="item" key={item.id}>
                {/* <h4>{item.display_name}</h4> */}
                <ProductCard product={item} />
              </div>
            </Col>
          </Row>
        ))}
      </ReactOwlCarousel>
    </div>
  );
};

export default OwlCurousel;
