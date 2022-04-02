import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "./disclaimer.scss";

const Disclaimer = () => {
  return (
    <>
      <div className="disclaimer">
        <div className="card text-dark text-center bg-transparent border-0">
          Contact us if you need to changed delivery dates
        </div>
        <div class="card mx-auto my-3 p-0 bg-transparent border-0">
          <div class="card-body d-flex align-items-center p-0 justify-content-around contact-info">
            <div>
              <FaWhatsapp
                className="me-2"
                style={{ width: "30px", height: "auto" }}
              />
              +91 8096091111
            </div>
            <div className="contact-phone">
              <FaPhoneAlt
                className="me-2"
                style={{ width: "20px", height: "auto" }}
              />
              <a href="#">+91 8096091111</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
