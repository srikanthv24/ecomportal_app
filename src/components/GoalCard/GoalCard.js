import React from "react";
import { Card } from "react-bootstrap";
import DetoxMyBody from "../../assets/mealplanner/Detox.png";
import "./goalCard.scss";

const GoalCard = React.memo(({ name, icon, onClick, isSelected }) => (
  <Card
    onClick={onClick}
    className={`goal-card${isSelected ? " bg-success" : ""}`}
  >
    <Card.Body className="p-2">
      {/* <div className="d-flex justify-content-center py-3">{icon}</div> */}
      <div className="d-flex justify-content-center">        
        <img src={icon} alt="image" height="50" />
      </div>
      <Card.Title
        className={`text-center m-0 py-2 goal-title${
          isSelected ? " text-white" : ""
        }`}
      >
        {name}
      </Card.Title>
    </Card.Body>
  </Card>
));

export default GoalCard;
