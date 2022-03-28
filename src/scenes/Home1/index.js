import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Container,
  Image,
  Alert,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import OwlCarousel from "react-owl-carousel";
import DeliciouslyHealthyTxtImage from "../../assets/home/delicious-txt.svg";
import SeedsWeb from "../../assets/home/seeds-web.svg";
import HalfLeafHeader from "../../assets/home/half-leaf-header.svg";
import GreenLeafBig from "../../assets/home/green-leaf-big.svg";
import chikkis from "../../assets/home/Chikkies.svg";
import GiftingImage from "../../assets/home/gifting-image.svg";
import SnacksImage from "../../assets/home/snacks-image.svg";
import DHImage from "../../assets/home/dh-image.svg";

import "./styles.css";
import "./homestyles.css";

function Home() {
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
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 2,

      }
    }
  }
  return (
    <>
      <div className="banner-container1 home-banner-img1 home-page-content-1">        
        <div className="w-100p">
         <h2 className="homebanner-text">Eat Deliciously healthy everyday!!</h2>          
        </div>

        <section className="choosemeals-content-block">
          <div class="d-flex overflow-hidden fdir-column w-100p">            
            <div className="d-flex justify-content-center px-2">
              <p className="text-left pt-4 pb-0"><span className="primary-font italic"><span className="fs-28 d-block">Tasty Food, Made Fresh</span> <span className="fs-22">- Delivered to your doorstep.</span></span></p>
            </div>
            <div className="info-block">
              <p className="for-store-des pt-2 pb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="#" class="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block">
               <Link to="/subscription" className="viewall-txt mb-0">
                  <Button
                    style={{ background: "#f05922", borderColor: "#f05910" }}
                    className="w-100 bg-chocolate-900"
                  >
                    <GiMeal size="30" /> Choose my meal
                  </Button>
                </Link>
              </a>
            </div>
          </div>
        </section>
      </div>

      <section className="catergory-types">
        <img src={SeedsWeb} alt="seeds" className="pos1" />
        <img src={HalfLeafHeader} alt="seeds" className="pos2"/>
        <img src={GreenLeafBig} alt="seeds" className="pos3"/>
        <div className="catergory-item box4">
          <h2 className="title-text">
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" class="text-center dhtxt-img" />
          </h2>
          <Link to="/products?category=Staples" className="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
          <img src={DHImage} alt="icon" className="dh-image" />
        </div>
        <div className="catergory-item box1">
          <h2 className="title-text">Visit our Store page to buy healthy staples</h2>
          <Link to="/products?category=Staples" className="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
          <img src={chikkis} alt="icon" className="item-image" />
        </div>
        <div className="catergory-item box2">
          <h2 className="title-text">Visit our Store page to buy healthy Gifting</h2>
          <Link to="/products?category=Staples" className="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
          <img src={GiftingImage} alt="icon" className="gifting-image" />
        </div>

        <div className="catergory-item box3">
          <h2 className="title-text">Visit our Store page to buy healthy Snacks</h2>
          <Link to="/products?category=Staples" className="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
          <img src={SnacksImage} alt="icon" className="snacks-image" />
        </div>        
      </section>

      <section className="how-it-works-block">
        <h2 className="py-4 text-center hiw-title-txt">How It Works</h2>
        <div>
          <OwlCarousel
            dots={true}
            dotsEach={false}
            className="owl-theme how-it-works"
            loop
            margin={20}
            nav {...options}
          >
            <div>
              <div className="hiw-citem">
                <p className="info-txt">I’ve been enjoying the treats from Sridevi’s kitchen studio for some time now along with my family. I love the taste and the feeling of comfort they give. </p>
                <p className="name-info-txt"><span>Raj Gopal K</span></p>
              </div>
            </div>
            <div>
              <div className="hiw-citem">
                <p className="info-txt">I’ve been enjoying the treats from Sridevi’s kitchen studio for some time now along with my family. I love the taste and the feeling of comfort they give. </p>
                <p className="name-info-txt"><span>Satish G</span></p>
              </div>
            </div>
            <div>
              <div className="hiw-citem">
                <p className="info-txt">I’ve been enjoying the treats from Sridevi’s kitchen studio for some time now along with my family.I love the taste and the feeling of comfort they give.</p>
                <p className="name-info-txt"><span>Raj Kumar</span></p>
              </div>
            </div>
            <div>
              <div className="hiw-citem">
                <p className="info-txt">I’ve been enjoying the treats from Sridevi’s kitchen studio for some time now along with my family.I love the taste and the feeling of comfort they give.</p>
                <p className="name-info-txt"><span>Roy</span></p>
              </div>
            </div>
          </OwlCarousel>
        </div>
        <hr className="hr-divider mb-0" />
      </section>
       
    </>
  );
}

export default Home;
