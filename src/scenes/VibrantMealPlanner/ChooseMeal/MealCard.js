import React from "react";
import { Card } from "react-bootstrap";
import MealImg from "../../../assets/meal.jpeg";

const MealCard = ({ name, onClick, isSelected, MealSrc }) => (
  <Card
    onClick={() => onClick()}
    className={`meal-card${isSelected ? " bg-success" : ""}`}
  >
    <Card.Body variant="top" className="p-2">
      <div className="prd-image-thumbnile">
        <img src={MealSrc || MealImg} alt="img" />
      </div>
    </Card.Body>
    <Card.Body className="pt-1 text-center px-1" style={{ minHeight: 40 }}>
      <Card.Text
        className="h6 mb-0 pb-0 col-12 text-truncate text-center mealcard-title"
      >
        {name}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default MealCard;
