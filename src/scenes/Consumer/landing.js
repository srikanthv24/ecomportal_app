import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import "./styles.css";
import { Alert, Card, Col, Container, Spinner } from "react-bootstrap";
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

  console.log("categories-TEMP", categories);
  return (
    <div className="content-body">
      <section className="page-content">
      <Container>
        {show && (
          <Alert
            key={"1"}
            variant={"danger"}
            className=""
            onClose={() => setShow(false)}
            dismissible
          >
            <IoNotifications />
            Renew the subscription ending in 5 days.
          </Alert>
        )}
      </Container>
      </section>

      <section className="page-content bg-1">
        <Container>
          <SimpleCard />
        </Container>
      </section>

      <section className="page-content py-5 bg-2">
      <Container>
      <Card style={{border:'none'}}>
        <Card.Header className="no-bg">
          <div className="d-flex justify-content-between">
            <span className="content-title" >Categories</span>
            <span>
              <Link to="/categories" className="viewall-txt">View all</Link>
            </span>
          </div>
        </Card.Header>
        <Card.Body className="m-0 p-0">
          {/* <LandingCarousel carouselItems={categories.categories} /> */}

          <CategoryList
            list={categories.categories}
            loading={categories.loading}
          />
        </Card.Body>
      </Card>
      </Container>
      </section>

      <section className="page-content bg-3">
      <Container>
      <Card style={{border:'none', backgroundColor:'transparent'}}>
      <Card.Header className="no-bg">
          <div className="d-flex justify-content-between align-items-baseline">
            <span className="content-title">Products</span>
            <span>
              <Link to="/products" className="viewall-txt">View all</Link>
            </span>
          </div>
        </Card.Header>
        <Card.Body className="m-0 p-1">
          <LandingCarousel
            multiItem
            carouselItems={products?.productList?.items || []}
            loading={products.loading}
          />
        </Card.Body>
      </Card>
      </Container>
      </section>
    </div>
  );
};

export default Landing;
