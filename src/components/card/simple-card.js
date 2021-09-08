import React from "react";
import { Card } from "react-bootstrap";
import "./styles.css";

const SimpleCard = () => {
  return (
    <Card border="light">
      <Card.Header>Subscriptions</Card.Header>
      <Card.Body>
        <div className="d-inline-flex align-items-center justify-content-between w-100">
          <div className="d-inline-flex align-items-center">
            <div className="avatar h4 me-3">S</div>
            <div>
              <span className="h6">Srinivas Prasad</span>
              <div className="text-muted">12-May-21 to 12-June-21</div>
            </div>
          </div>
          <div>28000.00</div>
        </div>
      </Card.Body>
      <Card.Footer style={{ textAlign: "center" }}>
        <a href="#">View more</a>
      </Card.Footer>
    </Card>
  );
};

export default SimpleCard;
