import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { IoCloseOutline, IoNotifications } from "react-icons/io5";
import { BiRupee } from "react-icons/bi";
import "./styles.css";

const SimpleCard = () => {
  const [show, setShow] = useState(true);
  return (
    <Card border="light" className="subscription-section">
      <Card.Header className="content-title no-bg">
        <div className="d-flex justify-content-between align-items-center">
          Subscriptions
          <a href="#" className="viewmore-txt">
            View all
          </a>
        </div>
      </Card.Header>

      <Card.Body>
        {show && (
          <div className="d-flex align-items-center justify-content-between text-danger">
            <p>
              <IoNotifications /> Renew the subscription ending in 5 days.
            </p>
            <p onClick={() => setShow(false)}>
              <IoCloseOutline />
            </p>
          </div>
        )}
        <div className="d-inline-flex align-items-center justify-content-between w-100">
          <div className="d-inline-flex align-items-center">
            <div className="avatar h4 me-3">S</div>
            <div>
              <span className="h6 fw-normal">Srinivas Prasad</span>
              <div
                className="text-muted"
                style={{
                  overflow: "wrap",
                  wordBreak: "break-word",
                  fontSize: 12,
                }}
              >
                12-May-21 to 12-June-21
              </div>
            </div>
          </div>
          <div>
            <span className="fw-bold" style={{ fontSize: 14 }}>
              <BiRupee /> 28000.00
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SimpleCard;
