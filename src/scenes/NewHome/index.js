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
  FormControl, Accordion
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import OwlCarousel from "react-owl-carousel";
import BannerMobile from "../../assets/home/home-header-banner-mobile.png";
import BannerWeb from "../../assets/home/home-header-banner-web.png";
import ChikkiPackMobile from "../../assets/home/chikkis-packet.png";
import ChikkiPackWeb from "../../assets/home/chikkis-packet-web.png";
import HomepageBannerContentWeb from "../../assets/home/nuts-and-seeds-white-bg.png";
import HalfLeafHeader from "../../assets/home/half-leaf-header.svg";
import GreenLeafBig from "../../assets/home/green-leaf-big.svg";
import VibrantLivingText from "../../assets/home/vibrant-living-text.svg";
import SeedsWeb from "../../assets/home/seeds-web.svg";
import SeedsMobile from "../../assets/home/download.svg";
import ChikkiBarImage from "../../assets/home/chikki-bar.svg";
import AlmondBananaBarImage from "../../assets/home/almond-and-banana-bar.svg";
import DeliciouslyHealthybgImage from "../../assets/home/deliciously-healthy-background.png";
import DeliciouslyHealthyTxtImage from "../../assets/home/delicious-txt.svg";
import chocoimg from "../../assets/home/StoreChoc.png";
import AlmondGreenBG from "../../assets/home/almond-green-bg.svg";
import HabaneroSpicedAlmonds from "../../assets/home/habanero-spiced-almonds.png";
import SesamePumpkinSeedChikki from "../../assets/home/sesame&pumpkin-seed-chikki.png";
import { getMealPlans } from "../../store/actions/mealPlans";


import "./styles.scss";

function Home() {
  const dispatch = useDispatch();
  const onGettingStarted = () => {
    dispatch(getMealPlans())
  }
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
      <div className="homepage-container homepage-banner-img">
        <div>
          <img src={BannerMobile} alt="home banner" className="for-mblview full-width" />
          <img src={BannerWeb} alt="home banner" className="for-webview full-width" />
        </div>
        <div className="homepagebanner-text-body">
          <h2 className="">Eat Deliciously <br />healthy <br />everyday!!</h2>
          <img src={HomepageBannerContentWeb} alt="image" className="for-mblview mx-auto" />
          <img src={HomepageBannerContentWeb} alt="image" className="for-webview" />
        </div>
      </div>
      {/* Green Bg Section */}
      <div className="homepage-green-bg-section">
        <img src={HalfLeafHeader} alt="seeds" className="halfleafImage hidden md:inline-block absolute right-[7rem] z-0" />
        {/* <img src={GreenLeafBig} alt="seeds" className="pos3" /> */}
        <div className="home-green-bg-content py-24 relative mx-auto z-0">
          <p className="row1-text mx-auto relative">
            {/* <span className="vlprimary-font vlitalic atText">at</span>
            <img src={VibrantLivingText} alt="vibrant living text" className="vlw-36" /> */}
            <span className="vlprimary-font text-koromiko weBeliveTxt">Deliciously</span>
            {/* <span className="vlitalic vlprimary-font weBeliveTxt">in</span> */}
          </p>
          <div className="row2-text relative mx-auto">
            <p className="leftText">
              <span className="vlprimary-font text-koromiko justify-self-end text-right">Healthy</span>
              {/* <span className="vlprimary-font vlitalic text-chocolate-300 relative text-right">&amp;</span> */}
            </p>
            <div className="middleImg">
              <div className="relative almond-green-circle-container">
                <img src={HabaneroSpicedAlmonds} alt="imgage" />
              </div>
            </div>
            <p className="RightText">
              <span className="vlprimary-font text-koromiko text-right">Meals</span>
            </p>
          </div>
          <div className="row3-text relative mx-auto">
            <div className="textItem">
              <img src={SeedsWeb} alt="seeds" className="for-webview mx-auto seedsImg" />
              <img src={SeedsMobile} alt="seeds" className="for-mblview seedsImg" />
              <span class="vlprimary-font text-koromiko text-80">Made fresh </span>
              {/* <span class="vlprimary-font vlitalic text-chocolate-300 text-80"> &amp; </span> */}
            </div>
            <div className="textItem">
              <span class="vlprimary-font text-koromiko text-80 vlh-4"> everyday</span>
            </div>
          </div>

          <div className="row4-text relative mx-auto">
            <div className="textItem">
              <div className="d-flex align-items-start">
                <div>
                  <span class="vlprimary-font text-koromiko text-80">Delivered to  </span>
                  <span class="vlprimary-font text-koromiko text-80 vlh-4">your doorstep</span>
                </div>
                <div>
                  {/* <span class="vlprimary-font vlitalic text-chocolate-300 text-80"> &amp; </span> */}
                </div>
              </div>
            </div>
            <div className="textItem">
              <div className="relative sesame-and-pumpkin-seed-circle-container">
                <img src={SesamePumpkinSeedChikki} alt="imgage" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-block text-center">
        <a href="#" className="gs-btn my-2 leading-8 bg-dark-green-800 tracking-wide rounded-full inline-block">
          <Link to="/vibrant-meal-planner" className="mb-0 px-7" onClick={onGettingStarted}>
          <GiMeal size="30" /> Get Started
          </Link>
        </a>
      </div>
      </div>
      
      {/* Green Bg Section */}


    </>
  );
}

export default Home;
