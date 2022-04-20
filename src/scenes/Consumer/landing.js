/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GiMeal } from "react-icons/gi";
import "./styles.css";
import { Card, Col, Container, Button, Row } from "react-bootstrap";
// import SimpleCard from "../../components/card/simple-card";
// import LandingCarousel from "../../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/products";
import { getCategories } from "../../store/actions/categories";
// import { Link } from "react-router-dom";
// import CategoryList from "../Categories/category-list";
// import HomeContent from "../Home/index";
import HomeContent1 from "../Home1/index";
import NewHomeContent from "../NewHome/index";
import FooterContent from "../Footer/index";
import StoreContent1 from "../../components/StoreContent1";
import FAQContent from "../FAQ/index";
import Testimonials from "../Testimonials/index"
// import LegalContent from "../../components/LegalContent";
import GridContentSection from "../Gridcontent/index";
import ViewContentSection from "../Viewcontent/index";
import CategoriesContent from "../CategoriesContent";


const Landing = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  // useEffect(() => {
  //   dispatch(getProductsAction({ limit: 10, nextToken: "" }));
  //   dispatch(getCategories({ limit: 40, nextToken: "" }));
  // }, []);

  // eslint-disable-next-line no-array-constructor
  let dummyList = new Array(10, {});

  console.log("categories-TEMP", categories);
  return (
    <section>
      <NewHomeContent />
      <Container fluid className="content-body px-0" style={{paddingBottom: '2rem' }}>
        {/* <section className="page-content1 py-3 bg-1"> */}
          <Container fluid style={{ background: "#F2CBBD", marginTop: '0rem' }}>
            <FAQContent />
          </Container>

          <Container fluid style={{ background: "#ffffff", marginTop: '0rem', padding:'0px' }}>
            <Testimonials />
          </Container>

          {/* <Container fluid style={{ background: "#F2CBBD", marginTop: '0rem' }}>
            <StoreContent1 />
          </Container> */}
         
        {/* </section> */}
      </Container>
      <FooterContent />
    </section>
  );
};

export default Landing;
