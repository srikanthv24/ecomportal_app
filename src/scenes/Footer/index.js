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

import FbIcon from "../../assets/footer/facebook.svg";
import InsagramIcon from "../../assets/footer/instagram.svg";
import YoutubeIcon from "../../assets/footer/youtube.svg";
import CopyrightIcon from "../../assets/footer/copyright.svg";
import FooterLogoIcon from "../../assets/footer/footer-logo-mobile.svg";
import "./styles.css";

function Footer() {
  let history = useHistory();
  return (
    <>
      <div className="footer-background relative footer-background w-full bottom-0 px-4">
        <div className="md:flex md:pt-20 justify-center relative z-5 pt-8">
          <p className="text-20 leading-8 text-chocolate-800 font-bold">
            Join the Vibrant tribe.<br />Sign up for special offers.
          </p>
          <div className="d-flex mt-3 md:mt-0 md:w-full max-w-md md:ml-14">
            <input type="email" placeholder="Enter your email" className="footer-input text-chocolate-800 text-20 leading-7 bg-chocolate-300 bg-opacity-40 py-2 pl-6 rounded-l-full w-full outline-none placeholder-opacity-50 no-border" />
            <button type="submit" className="text-chocolate-800 bg-chocolate-300 bg-opacity-40 py-2 px-6 rounded-r-full -ml-0.1 uppercase secondary-font-mono font-medium leading-7 text-16 no-border">subscribe</button>
          </div>
        </div>

        <div className="pt-14 md:pt-32 md:flex md:w-full md:flex-row-reverse md:justify-between md:max-w-screen-xl md:mx-auto">
          <div className="md:w-full md:max-w-xl pb-16 md:pb-0">
            <ul className="d-flex w-full flex-wrap justify-between footer-ul">
              <li>
                <p className="text-20 text-chocolate-800 font-bold leading-8">Shop</p>
                <ul className="text-chocolate-800 text-16 font-normal leading-5">
                  {/* <li className="py-1"><a href="#">Cafe</a></li> */}
                  <li className="py-1"><a href="/store">Store</a></li>
                </ul>
              </li>
              <li>
                <p className="text-20 text-chocolate-800 font-bold leading-8">Company</p>
                <ul className="text-chocolate-900 text-16 font-normal leading-5">
                  <li className="py-1"><a href="#">Our Story</a></li>
                  <li className="py-1"><a href="#">Careers</a></li>
                  <li className="py-1"><a href="#">Contact us</a></li>
                </ul>
              </li>
              <li>
                <p className="text-20 text-chocolate-800 font-bold leading-8">Social</p>
                <ul className="d-flex justify-between text-chocolate-900 text-16 font-normal space-x-2 md:space-x-0">
                  <li className="flex md:inline-block md:py-1">
                    <a href="https://m.facebook.com/sridevijasti/" target="_blank" className="w-6 h-6 md:w-auto md:h-auto inline-block">
                      <img src={FbIcon} alt="facebook icon" className="md:hidden" />
                      {/* <p className="hidden md:block">Facebook</p> */}
                    </a>
                  </li>
                  <li className="flex md:inline-block md:py-1">
                    <a href="https://instagram.com/officialvibrantliving" target="_blank" className="w-6 h-6 md:w-auto md:h-auto inline-block">
                      <img src={InsagramIcon} alt="instagram icon" className="md:hidden" />
                      {/* <p className="hidden md:block">Instagram</p> */}
                    </a>
                  </li>

                  <li className="flex md:inline-block md:py-1">
                    <a href="https://youtube.com/c/VibrantLivingbySrideviJasti" target="_blank" className="w-6 h-6 md:w-auto md:h-auto inline-block">
                      <img src={YoutubeIcon} alt="youtube icon" className="md:hidden" />
                      {/* <p className="hidden md:block">Youtube</p> */}
                    </a>
                  </li>
                </ul>
              </li>

              <li className="w-full md:w-auto pt-3 md:pt-0">
                <p className="text-20 text-chocolate-800 font-bold leading-8">Other</p>
                <ul className="flex-row flex justify-between flex-wrap md:block text-chocolate-900 text-16 font-normal leading-5">
                  <li className="py-1 w-full md:w-full" onClick={() => {                   
                    history.push("/privacypolicy");
                  }}>Privacy Policy</li>
                  <li className="py-1 w-full md:w-full md:opacity-75" onClick={() => {                   
                    history.push("/legalcontent");
                  }}>Terms and Conditions</li>
                  {/* <li className="py-1 w-[4.75rem] md:w-full md:opacity-75"><a href="#">Shipping</a></li>
                  <li className="py-1 w-[4.75rem] md:w-full md:opacity-75"><a href="#">Made with Ellipsis</a></li> */}
                  {/* <li className="py-1 w-full md:opacity-75"><a href="#">Payments</a></li> */}
                </ul>
              </li>
            </ul>
          </div>
          <a href="#" className="d-block">
            <img src={FooterLogoIcon} alt="footer logo" className="mt-18 md:hidden h-full" />
            {/* <img src={FooterLogoIcon} alt="for Web footer logo" className="hidden md:block" /> */}
          </a>
        </div>
        <p className="copyrighttxt whitespace-nowrap uppercase font-bold text-14 text-center bottom-0 left-0 right-0 pb-3 tracking-wider leading-5 mb-0">copyright <img src={CopyrightIcon} alt="copyright image" className="inline" /> vibrant living</p>
      </div>
    </>
  );
}

export default Footer;
