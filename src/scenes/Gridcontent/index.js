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

function Gridcontent() {

  return (
    <>
      <div className="d-flex overflow-hidden">        
        <div className="relative bg-chocolate-300 text-center md:w-1/2">
          <p className="pt-[6.25rem] primary-font font-bold text-44 leading-[3.125rem] text-chocolate-900 md:text-54 md:leading-[3.4rem] tracking-wide capitalize">staples</p>
          <a href="#" className="mt-10 md:mt-14 mb-4 leading-8 bg-chocolate-800 py-3.5 px-7 tracking-wide rounded-full inline-block text-decoration-none">
            <p className="capitalize secondary-font-mono text-14 text-white mb-0">explore staples</p>
          </a>
          <img src={CafeExploreImage} alt="items anime image" className="cafe-explore-image w-[110%] -ml-1 md:w-full md:max-w-full md:m-0 absolute md:absolute md:bottom-0 overflow-hidden object-cover md:object-contain md:left-0" />
        </div>

        <div className="relative bg-koromiko text-center md:w-1/2">
          <p className="pt-[6.25rem] primary-font font-bold text-44 leading-[3.125rem] text-chocolate-900 md:text-54 md:leading-[3.4rem] tracking-wide">Gifting</p>
          <a href="#" className="mt-10 md:mt-14 mb-4 leading-8 bg-white py-3.5 px-7 font-medium tracking-wide rounded-full inline-block z-5 relative text-decoration-none">
            <p className="uppercase secondary-font-mono text-14 text-chocolate-900 mb-0">GIVE A HEALTHY DELICIOUS GIFT</p>
          </a>
          <div className="d-flex justify-content-between">
            <img src={BananaLeavesImage} alt="banana leaves" className="" style={{maxWidth:'240px'}} />
            <img src={GiftBagImage} alt="gift bag with some flowers and a gift" class ="" style={{maxWidth:'320px'}} />
          </div>
          {/* <img src={BananaLeavesImage} alt="banana leaves" className="-mb-20 -ml-9 w-48 md:m-0 md:w-60" />
          <img src={GiftBagImage} alt="gift bag with some flowers and a gift" class ="z-0 right-[-2.5rem] w-52 absolute bottom-[80px] md:bottom-0 md:right-0 md:w-60 lg:w-80" /> */}
          </div>
        </div>

      <div className="d-flex overflow-hidden">        
        <div className="relative bg-koromiko text-center md:w-1/2">
          <div className="relative w-full bg-[#FDD8D0]1 min-h-[305px] md:min-h-[700px] d-flex h-full">
            <img src={DeliciouslyHealthybgImage} alt="a curve" className="absolute right-0 h-full w-4/5 md:w-1/2 dh-txt-bg" />
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" className="text-center dh-txt-image" />    
            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
          </div>
        </div>

        <div className="relative bg-chocolate-300 text-center md:w-1/2">
          <div className="relative w-full bg-[#FDD8D0] min-h-[305px] md:min-h-[700px] flex h-full">
            <img src={DeliciouslyHealthybgImage} alt="a curve" className="absolute right-0 h-full w-4/5 md:w-1/2 dh-txt-bg" />
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" className="text-center dh-txt-image" />    
          </div>
        </div>
        </div>
      </>
      );
}

      export default Gridcontent;
