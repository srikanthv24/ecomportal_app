import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/app-bar";
import { IoAppsOutline, IoNotifications } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";

import "./styles.css";
import { Alert, Container } from "react-bootstrap";
import SimpleCard from "../../components/card/simple-card";
import LandingCarousel from "../../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/products";
import { getCategories } from "../../store/actions/categories";

const Landing = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    console.log("categoriesXV", categories);
  }, [categories]);

  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <Container>
        {show && (
          <Alert
            key={"1"}
            variant={"danger"}
            className="me-2 mt-3"
            onClose={() => setShow(false)}
            dismissible
          >
            <IoNotifications />
            Renew the subscription ending in 5 days.
          </Alert>
        )}
      </Container>
      <SimpleCard />

      <span className="d-inline h3">Categories</span>

      <LandingCarousel carouselItems={categories.categories} />

      <span className="d-inline h3">Products</span>

      <LandingCarousel multiItem carouselItems={products.productList} />
    </div>
  );
};

export default Landing;
