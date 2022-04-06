import React from "react";
import { Card } from "react-bootstrap";

import "./goalCard.scss";

const GoalCard = ({ name, icon, onClick, isSelected }) => (
  <Card
    onClick={() => onClick()}
    className={`goal-card${isSelected ? " bg-success" : ""}`}
    style={{ width: "10rem" }}
  >
    <Card.Body className="p-2">
      <div className="d-flex justify-content-center py-3">{icon}</div>
      <Card.Title
        className={`text-center m-0 py-2 goal-title${
          isSelected ? " text-white" : ""
        }`}
      >
        {name}
      </Card.Title>
    </Card.Body>
  </Card>
);

export default GoalCard;
