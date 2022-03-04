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

import "./styles.css";
import CafeExploreImage from "../../assets/home/cafe-explore.svg";
import BananaLeavesImage from "../../assets/home/banana-leaves.svg";
import GiftBagImage from "../../assets/home/gift-bag.svg";
import DeliciouslyHealthybgImage from "../../assets/home/deliciously-healthy-background.png";
import DeliciouslyHealthyTxtImage from "../../assets/home/delicious-txt.svg";

function CategoriesContent() {

  return (
    <>
      <section className="categories-block">
        <div className="category-item-block bg-chocolate">
          <h2 className="title-text">staples</h2>
          <a href="#" class="mt-10 md:mt-14 mb-4 leading-8 bg-chocolate-800 py-3.5 px-7 tracking-wide rounded-full inline-block">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore staples</p>
          </a>
          <img src={CafeExploreImage} alt="items anime image" className="cafe-explore-image w-[110%] -ml-1 md:w-full md:max-w-full md:m-0 absolute md:absolute md:bottom-0 overflow-hidden object-cover md:object-contain md:left-0" />
        </div>
        <div className="category-item-block bg-koromiko">
          <h2 className="title-text">Gifting</h2>
          <a href="#" class="mt-10 md:mt-14 mb-4 leading-8 bg-white py-3.5 px-7 tracking-wide rounded-full inline-block">
            <p class="capitalize secondary-font-mono text-14 text-chocolate-900 mb-0">GIVE A HEALTHY DELICIOUS GIFT</p>
          </a>
          <div class="d-flex justify-content-between">
            <img src={BananaLeavesImage} alt="banana leaves" class="bananaleaves-img" />
            <img src={GiftBagImage} alt="gift bag with some flowers and a gift" class="giftbag-img" />
          </div>
        </div>
      </section>
      <section className="dliciuosly-content-block">
        <div class="d-flex overflow-hidden fdir-column w-100p">
          <div className="img-block">
            <img src={DeliciouslyHealthybgImage} alt="a curve" class="absolute right-0 h-full w-4/5 md:w-1/2 dh-txt-bg formbldhbg-img" />
            <img src={DeliciouslyHealthyTxtImage} alt="a curve" class="text-center dh-txt-image formbldh-img" />
          </div>
          <div className="info-block">
            <p className="for-store-des formbl-py4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a href="#" class="mt-5 mb-5 leading-8 bg-chocolate-800 py-3.5 px-7 tracking-wide rounded-full inline-block">
            <p class="capitalize secondary-font-mono text-14 text-white mb-0">explore staples</p>
          </a>
          </div>
        </div>
      </section>
      {/* <section>
        <div class="d-flex overflow-hidden">
          <div class="relative minh-700 text-center md:w-1">
            <div class="relative w-full bg-[#FDD8D0]1 min-h-[305px] md:min-h-[700px] d-flex h-full">
              <img src={DeliciouslyHealthybgImage} alt="a curve" class="absolute right-0 h-full w-4/5 md:w-1/2 dh-txt-bg" />
              <img src={DeliciouslyHealthyTxtImage} alt="a curve" class="text-center dh-txt-image" />
            </div>
          </div>
          <div className="relative">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default CategoriesContent;
