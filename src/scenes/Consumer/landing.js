import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import "./styles.css";
import { Alert, Card, Container } from "react-bootstrap";
import SimpleCard from "../../components/card/simple-card";
import LandingCarousel from "../../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/products";
import { getCategories } from "../../store/actions/categories";
import { Link } from "react-router-dom";
import CategoryList from "../Categories/category-list";

const Landing = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductsAction({ limit: 10, nextToken: "", category: "" }));
    dispatch(getCategories({ limit: 40, nextToken: "" }));
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
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <span className="h5">Categories</span>
            <span>
              <Link to="/categories">View all</Link>
            </span>
          </div>
        </Card.Header>
        <Card.Body className="m-0 p-0">
          {/* <LandingCarousel carouselItems={categories.categories} /> */}
          <CategoryList list={categories.categories} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-baseline">
            <span className="h5">Products</span>
            <span>
              <Link to="/products">View all</Link>
            </span>
          </div>
        </Card.Header>
        <Card.Body className="m-0 p-1">
          <LandingCarousel
            multiItem
            carouselItems={products?.productList?.items || []}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Landing;
