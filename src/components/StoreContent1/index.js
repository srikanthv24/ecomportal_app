import React from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
import AlmondBannanabar from "../../assets/home/almond-banana-bar.png";
import LandingCarousel from "../carousel";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import chocoimg from "../../assets/home/StoreChoc.png";
import test from "../../assets/default_thumbnail.png";
import { useHistory } from "react-router-dom";

const StoreContent1 = () => {
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  console.log("categories", categories.categories);
  const history = useHistory();
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,

      }
    },
  };
  return (
    <div>
      <Card
        style={{
          border: "none",
          maxWidth: "100%",
          margin: "0 auto",
          background: "transparent",
        }}
      >
        <h2 className="py-0 text-center hiw-title-txt">Products</h2>

      </Card>
      {categories.categories.length > 1 ? (
        <OwlCarousel
          dots="false"
          dotsEach="false"
          className="owl-theme home-page-product-owl"
          loop
          margin={10}
          nav {...options}
        >
          {categories.categories.map((item, index) => {
            return (
              <div className="prd-detail-info-item" key={index} onClick={() =>
                history.push(`/products?category=${item.display_name}`)
              }>
                <div className="for-image-hover">
                  <div className="prd-img-block">
                    <img
                      className="for-image"
                      src={
                        item.defaultimg_url
                          ? item.defaultimg_url
                          : test
                      }
                      alt="img"
                    />
                  </div>
                  <div className="prd-info-block">
                    <p className="for-product-name primary-font">{item.display_name}</p>
                    {/* <p className="for-product-price">₹0.00</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      ) : null}
      {/* <OwlCarousel  dots="false" dotsEach="false" dotData="false"  className="owl-theme" loop margin={10} nav>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
          </OwlCarousel>   */}
    </div>
  );
};
export default StoreContent1;
