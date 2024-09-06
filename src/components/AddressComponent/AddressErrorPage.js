import React from "react";
import { DISCLAIMER_DATA, PICKUP, WHATSAPP_LINK } from "../../utils/constants";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const AddressErrorPage = () => {
  return (
    <>
      <section className="disclaimerWrapper">
        <div className="card text-dark text-center bg-transparent border-0 disclaimer-info">
          <h3>
            Unfortunately our services are not available in your area, please
            give a call to arrange alternate delivery options
          </h3>
          <h3>
            &nbsp;<strong>+91 {DISCLAIMER_DATA.CONTACT_NUMBER}</strong>
            &nbsp;
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
          <a
            href={`tel:${DISCLAIMER_DATA.CONTACT_NUMBER}`}
            className="contact-info"
          >
            <span>
              <FaPhoneAlt
                className=""
                style={{ width: "30px", height: "auto" }}
              />
            </span>
          </a>
        </div>
      </section>
    </>
  );
};

export default AddressErrorPage;
