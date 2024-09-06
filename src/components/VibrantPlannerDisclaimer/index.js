import React from "react";
import { DISCLAIMER_DATA, WHATSAPP_LINK } from "../../utils/constants";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "../Disclaimer/disclaimer.scss";

const VibrantPlannerDisclaimer = ({ handleBackClick }) => {
  return (
    <div className="disclaimer-meal-plan">
      <section className="disclaimerWrapper">
        <div className="card text-dark text-center bg-transparent border-0 disclaimer-info">
          <h3>{DISCLAIMER_DATA.PRIMARY_TEXT}
            &nbsp;<strong>{DISCLAIMER_DATA.CONTACT_NUMBER}</strong>&nbsp;
            {DISCLAIMER_DATA.SECONDARY_TEXT}
          </h3>
        </div>
        <div className="d-flex align-items-center justify-content-center message-contact-number-info my-3">
          <a href={WHATSAPP_LINK} className="whatsup-info">
            <span className="d-flex align-items-center">
              <FaWhatsapp
                className=""
                style={{ width: "35px", height: "auto" }}
              />              
            </span>
          </a>
          <a href={`tel:${DISCLAIMER_DATA.CONTACT_NUMBER}`} className="contact-info">
            <span>
              <FaPhoneAlt
                className=""
                style={{ width: "30px", height: "auto" }}
              />             
            </span>
          </a>
        </div>
        {/* <div className="card text-dark text-center bg-transparent border-0 disclaimer-plzinfo">
            Please call us
          </div> */}
        {/* <div className="card mx-auto my-3 p-0 bg-transparent border-0">
            <div className="card-body d-flex align-items-center p-0 justify-content-around contact-info">
            <a href={WHATSAPP_LINK}>
              <div className="d-flex align-items-center whatsup-phone test-class">
                <FaWhatsapp
                  className="me-2"
                  style={{ width: "30px", height: "auto" }}
                />
                {`+91 ${DISCLAIMER_DATA.CONTACT_NUMBER}`}
              </div>

            </a>
              <div className="d-flex align-items-center contact-phone">
                <FaPhoneAlt
                  className="me-2"
                  style={{ width: "20px", height: "auto" }}
                />
                <a href="#">{`+91 ${DISCLAIMER_DATA.CONTACT_NUMBER}`} </a>
              </div>
            </div>
          </div> */}
        <div className="dis-back-btn">
          <button type="button" onClick={handleBackClick}>Go Back</button>
        </div>
      </section>

    </div>
  )
}

export default VibrantPlannerDisclaimer;