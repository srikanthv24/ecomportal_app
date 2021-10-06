import React from "react";
import { Card } from "react-bootstrap";
import "./styles.css";

const SimpleCard = () => {
  return (
    <Card border="light" className="subscription-section">
      <Card.Header className="content-title no-bg">Subscriptions</Card.Header>
      <Card.Body>
        <div className="d-inline-flex align-items-center justify-content-between w-100">
          <div className="d-inline-flex align-items-center">
            <div className="avatar h4 me-3">S</div>
            <div>
              <span className="h6 fw-bold">Srinivas Prasad</span>
              <div className="text-muted">12-May-21 to 12-June-21</div>
            </div>
          </div>
          <div><strong>28000.00</strong></div>
        </div>
      </Card.Body>
      <Card.Footer className="no-bg text-center">
        <a href="#" className="viewmore-txt">View more</a>
      </Card.Footer>
    </Card>
  );
};

export default SimpleCard;
