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
import BannerMobile from "../../assets/home/home-header-banner-mobile.png";
import BannerWeb from "../../assets/home/home-header-banner-web.png";
import ChikkiPackMobile from "../../assets/home/chikkis-packet.png";
import ChikkiPackWeb from "../../assets/home/chikkis-packet-web.png";
import HalfLeafHeader from "../../assets/home/half-leaf-header.svg";
import VibrantLivingText from "../../assets/home/vibrant-living-text.svg";
import SeedsWeb from "../../assets/home/seeds-web.svg";
import ChikkiBarImage from "../../assets/home/chikki-bar.svg";
import AlmondBananaBarImage from "../../assets/home/almond-and-banana-bar.svg";
import DeliciouslyHealthybgImage from "../../assets/home/deliciously-healthy-background.png";
import DeliciouslyHealthyTxtImage from "../../assets/home/delicious-txt.svg";
import chocoimg from "../../assets/home/StoreChoc.png";

import "./styles.css";

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
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,

      }
    }
  }
  return (
    <>
      <div className="banner-container home-banner-img">
        {/* <div>
          <img src={BannerMobile} alt="home banner" className="for-mobile-only full-width" />
          <img src={BannerWeb} alt="home banner" className="for-web-only full-width" />
        </div> */}
        <div className="banner-text-body">
          {/* <h2 className="banner-text">A three-line<br />values<br />proportion</h2> */}
          <h2 className="banner-text">Eat Deliciously healthy everyday!!</h2>
          {/* <img src={ChikkiPackMobile} alt="pumpkin and sesame chikkis packet image" className="for-mobile-only mx-auto" />
          <img src={ChikkiPackWeb} alt="pumpkin and sesame chikkis packet image" className="for-web-only" /> */}
        </div>

        <section className="dliciuosly-content-block">
          <div class="d-flex overflow-hidden fdir-column w-100p">
            {/* <div className="img-block">
            <img src={DeliciouslyHealthybgImage} alt="a curve" class="absolute right-0 h-full w-4/5 md:w-1/2 dh-txt-bg formbldhbg-img" />
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" class="text-center dh-txt-image formbldh-img" />
          </div> */}
            <div className="d-flex justify-content-center px-2">
              <p className="text-left pt-4 pb-0"><span className="primary-font italic"><span className="fs-28 d-block">Tasty Food, Made Fresh</span> <span className="fs-22">- Delivered to your doorstep.</span></span></p>
            </div>
            <div className="info-block">
              <p className="for-store-des pt-2 pb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="#" class="my-2 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block">
                {/* <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore staples</p> */}
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

      <section className="grid-items">
        <div className="grid-item bg-chocolate">
          <h2 className="title-text">staples</h2>
          <Link to="/products?category=Staples" className="my-4 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
        </div>
        <div className="grid-item bg-koromiko">
          <h2 className="title-text">Gifting</h2>
          <Link to="/products?category=Staples" className="my-4 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
        </div>

        <div className="grid-item bg-koromiko">
          <h2 className="title-text">Snacks</h2>
          <Link to="/products?category=Staples" className="my-4 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
        </div>

        <div className="grid-item bg-chocolate">
          <h2 className="title-text">
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" class="text-center dhtxt-img" />
          </h2>
          <Link to="/products?category=Staples" className="my-4 leading-8 bg-chocolate-800 py-1 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore</p>
          </Link>
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
            margin={10}
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
      </section>
    </>
  );
}

export default Home;
