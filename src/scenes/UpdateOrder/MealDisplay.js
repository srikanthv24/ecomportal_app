import React from "react";
import TruckImage from "../../assets/home/truck.png";

const MealDisplay = ({ name, type }) => {
  return (
    <div className="meal-card1 update-planner-card">
      <div className="mear-type-card d-flex align-items-center text-left justify-content-start">
        <span>{name}</span>
        <span>
          <img src={TruckImage} alt="image" height="24" />
        </span>
      </div>
    </div>
  );
};

export default MealDisplay;
