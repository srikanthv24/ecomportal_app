import React, { useEffect, useState } from "react";
import { Button, Card, Col, Navbar, Row } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";
import ProductCard from "./product-card";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../../store/actions/products";

var phantom = {
  display: "block",
  padding: "20px",
  height: "70px",
  width: "100%",
};
const ProductsList = ({ list, items }) => {
  console.log("LIST==", list, items);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [list]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    console.log("Fetch more list items!");
    dispatch(getProductsAction({ nextToken: list.nextToken, limit: 10 }));
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [list]);

  let dummyList = new Array(10, {});

  if (Loading) {
    return dummyList.map(() => {
      return (
        <Col lg={4} md={4} sm={6} xs={6} className="m-0 p-1">
          <div class="card" aria-hidden="true">
            <div
              style={{
                backgroundImage: `url(${"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "120px",
                width: "100%",
              }}
            />
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabindex="-1"
                class="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </Col>
      );
    });
  }

  if (!list.items.length) {
    return <h3>No products found!!</h3>;
  }
  return (
    <>
      {items.length &&
        items.map((item) => {
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
