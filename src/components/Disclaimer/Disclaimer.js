import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { DISCLAIMER_DATA } from "../../utils/constants";
import "./disclaimer.scss";
import useQuery from "../../hooks/useQuery";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  const query = useQuery();

  return (
    <>
      <div className="disclaimer">
        <div className="card text-dark text-center bg-transparent border-0">
          {query.get("name") === "subscription" ? (
            <h3>{DISCLAIMER_DATA.PRIMARY_TEXT}</h3>
          ) : (
            <h3>{DISCLAIMER_DATA.SECONDARY_TEXT}</h3>
          )}
        </div>
        <div className="card text-dark text-center bg-transparent border-0">
          Please call us
        </div>
        <div class="card mx-auto my-3 p-0 bg-transparent border-0">
          <div class="card-body d-flex align-items-center p-0 justify-content-around contact-info">
            <div>
              <FaWhatsapp
                className="me-2"
                style={{ width: "30px", height: "auto" }}
              />
              {`+91 ${DISCLAIMER_DATA.CONTACT_NUMBER}`}
            </div>
            <div className="contact-phone">
              <FaPhoneAlt
                className="me-2"
                style={{ width: "20px", height: "auto" }}
              />
              <a href="#">{`+91 ${DISCLAIMER_DATA.CONTACT_NUMBER}`} </a>
            </div>
          </div>
        </div>
        <div className="dis-back-btn">
        <Link to="/vibrant-meal-planner">
          <p>Back</p>
        </Link>
        </div>
        </div>
    </>
  );
};

export default Disclaimer;
