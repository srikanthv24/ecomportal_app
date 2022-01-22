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

import BannerMobile from "../../assets/home/home-header-banner-mobile.png";
import BannerWeb from "../../assets/home/home-header-banner-web.png";
import ChikkiPackMobile from "../../assets/home/chikkis-packet.png";
import ChikkiPackWeb from "../../assets/home/chikkis-packet-web.png";
import HalfLeafHeader from "../../assets/home/half-leaf-header.svg";
import VibrantLivingText from "../../assets/home/vibrant-living-text.svg";
import SeedsWeb from "../../assets/home/seeds-web.svg";
import ChikkiBarImage from "../../assets/home/chikki-bar.svg";
import AlmondBananaBarImage from "../../assets/home/almond-and-banana-bar.svg";
import "./styles.css";

function Home() {

  return (
    <>
      <div className="banner-container">
        <div>
          <img src={BannerMobile} alt="home banner" className="for-mobile-only full-width" />
          <img src={BannerWeb} alt="home banner" className="for-web-only full-width" />
        </div>
        <div className="banner-text-body">
          <h2 className="banner-text">A three-line<br />values<br />proportion</h2>
          <img src={ChikkiPackMobile} alt="pumpkin and sesame chikkis packet image" className="for-mobile-only mx-auto" />
          <img src={ChikkiPackWeb} alt="pumpkin and sesame chikkis packet image" className="for-web-only" />
        </div>
      </div>

      <div className="home-content-2">
        <img src={HalfLeafHeader} alt="green leaf" className="for-web-only" />
        <div className="w-100p text-center">
          <p className="fs-48 primary-font text-chocolate-300 my-3">
            <span className="primary-font italic">at</span>
            <img src={VibrantLivingText} alt="vibrant living text" className="mx-2" height="80"/>
            <span className="">we believe</span>
            <span className="italic primary-font">in</span>
          </p>
          <p className="fs-48 primary-font text-chocolate-300 naturetxt-paragraph">
            <span className="primary-font text-koromiko naturetxt-style">Natural</span>
            <span className="primary-font italic text-chocolate-300">to</span>
            <img src={AlmondBananaBarImage} alt="almong and banana bar image" className="chikki-img" height="135" />
            <span className="primary-font text-koromiko holistictxt-style">Holistic</span>     
          </p>
          <p className="fs-48 d-flex justify-content-center">
            <img src={SeedsWeb} alt="seeds" className="" height="59" />
            <span className="primary-font text-koromiko">Seeds</span>
              <span className="primary-font italic text-chocolate-300 px-2">to</span>
              <span className="primary-font text-koromiko ">Soul</span>
              <img src={SeedsWeb} alt="seeds" className="" height="59" />
          </p>
          <div className="d-flex px-2 align-items-center justify-content-center">
            <img src={ChikkiBarImage} alt="chikki bar" className="" height="135" />
            <p className="fs-48">
              <span className="primary-font text-koromiko ">Earth </span>
              <span className="primary-font italic text-chocolate-300 ">to </span>
              <span className="primary-font text-koromiko ">heart</span>
            </p>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
