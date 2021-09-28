import React from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import OwlCurousel from "./owl-curousel";

const LandingCarousel = ({ carouselItems, multiItem, loading }) => {
  const history = useHistory();
  console.log("CarouselItems", carouselItems, multiItem);

  if (loading) {
    return (
      <span
        style={{ width: "100%", height: 200 }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <Spinner animation="border" variant="primary" />

        <span className="h6 text-muted">Loading...</span>
      </span>
    );
  }

  return multiItem ? (
    <div>
      {carouselItems.length && <OwlCurousel carouselItems={carouselItems} />}
    </div>
  ) : (
    <Carousel>
      {carouselItems.length &&
        carouselItems.map((item) => {
          return (
            <Carousel.Item
              key={item.id}
              onClick={() =>
                history.push(`/products?category=${item.display_name}`)
              }
            >
              <div
                style={{
                  backgroundImage: `url(${
                    item.defaultimg_url ||
                    "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                  width: "100%",
                }}
              />
              <Carousel.Caption>
                <h5>{item.display_name}</h5>
                <p>{item.description}</p>
                <h5>{item.category}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default LandingCarousel;
