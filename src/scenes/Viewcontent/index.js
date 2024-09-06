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

import CafeExploreImage from "../../assets/home/cafe-explore.svg";
import BananaLeavesImage from "../../assets/home/banana-leaves.svg";
import GiftBagImage from "../../assets/home/gift-bag.svg";
import DeliciouslyHealthybgImage from "../../assets/home/deliciously-healthy-background.png";
import DeliciouslyHealthyTxtImage from "../../assets/home/delicious-txt.svg";
import "./styles.css";

function Viewcontent() {

  return (
    <>
      <div className="relative pt-4">
        {/* <img src="/assets/store-banner-bg.png" alt="" className="w-full hidden md:block" />
        <img src="/assets/store-banner-bg-m.png" alt="" className="w-full md:hidden" /> */}
        <div className="text-center store-header-title-container relative md:absolute md:bottom-[15%] md:left-[50%] md:transform md:-translate-x-1/2 -mt-10 md:w-full mt-4">
          <p className="primary-font italic text-30 md:text-54 leading-none font-bold text-chocolate-900 mb-0">Deliciously</p>
          <p className="secondary-font-condensed text-30 md:text-54 font-bold uppercase leading-none text-chocolate-900">healthy</p>
          <p className="mt-2 w-9/12 md:w-6/12 text-16 md:text-20 leading-tight mx-auto text-chocolate-dark md:text-chocolate-700 md:opacity-100">Walk-in and experience our spectrum of products and services for a wholesome, vibrant lifestyle. Enjoy!</p>
        </div>
      </div>
      <div className="make-list-sticky uppercase font-medium fixed bottom-[1.875rem] md:bottom-auto md:sticky md:top-0 md:py-4 lg:py-8 w-full z-10 -mt-20">
        <label className="flex justify-center w-full " name="show-snacks-list">
          {/* <input type="radio" name="show-snacks-list" className="show-snacks-list hidden" onclick="radioClick(event)" onkeyup="radioClick(event)" /> */}
          {/* <span className="bg-white py-4 px-5  flex rounded-[25px] snacks-shadow md:hidden cursor-pointer"> */}
            {/* <img src="/assets/icons/drinks.svg" alt="healthy snacks image" /> */}
            {/* <p className="self-center pl-4 leading-7 text-16 secondary-font-mono">healthy snacks</p> */}
          {/* </span> */}
          <div className="fixed left-0 right-0 top-0 bottom-0 opacity-70 bg-chocolate-900 md:hidden z-10" onclick="closepopup('show-snacks-list')"></div>
          <div className="bg-white md:bg-transparent rounded-[20px] show-snacks-list-items w-4/5 max-w-xs md:max-w-full z-40 md:z-10 md:block md:w-full">
            <ul className="py-6 space-y-4 md:space-y-0 px-4 md:p-0 d-flex md:flex md:justify-center md:space-x-5">
              <li>
                <a href="#Healthy Snacks" className="flex items-center md:rounded-[25px] md:border-2 md:border-[#231B10] md:border-opacity-20 md:bg-white md:px-4 md:py-4">
                  {/* <img src="/assets/icons/drinks.svg" alt="healthy snacks image" className="w-8 h-8" /> */}
                  <p className="pl-4 leading-7 text-12 lg:text-16 secondary-font-mono text-chocolate-800 mb-0">healthy snacks</p>
                </a>
              </li>
              <li>
                <a href="#Ready To Make Foods" className="flex items-center md:rounded-[25px] md:border-2 md:border-[#231B10] md:border-opacity-20 md:bg-white md:px-4 md:py-4">
                  {/* <img src="/assets/icons/tea-cup.svg" alt="ready to make image" className="w-8 h-8" /> */}
                  <p className="pl-4 leading-7 text-12 lg:text-16 secondary-font-mono text-chocolate-800 mb-0">ready-to-make</p>
                </a>
              </li>
              <li>
                <a href="#Premium Pickles &amp; Curry Powders" className="flex items-center md:rounded-[25px] md:border-2 md:border-[#231B10] md:border-opacity-20 md:bg-white md:px-4 md:py-4">
                  {/* <img src="/assets/icons/pickles.svg" alt="pickles and powders image" className="w-8 h-8" /> */}
                  <p className="pl-4 leading-7 text-12 lg:text-16 secondary-font-mono text-chocolate-800 mb-0">pickles and powders</p>
                </a>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </>
  );
}

export default Viewcontent;
