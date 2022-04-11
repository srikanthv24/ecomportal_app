import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MEAL_PLAN_STEPS, NEXT } from "../../utils/constants";
import VibrantPlannerDisclaimer from "../VibrantPlannerDisclaimer";
import GoalCard from "../GoalCard/GoalCard";
import "./goalList.scss";
import { FaRegGrinHearts } from "react-icons/fa";
import Goal from "../../assets/mealplanner/goal.png";

const GoalList = ({ handleBack, handleNextStep, selectedGoal, onGoalClick, goals }) => {
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleClick = (e, goal) => {
    e.preventDefault();
    onGoalClick(goal);
  };

  useEffect(() => {
    setIsSelected(true);
    selectedGoal === "custom" ? setShowDisclaimer(true) : setShowDisclaimer(false);
  }, [selectedGoal]);

  const handleBackClick = () => {
    setShowDisclaimer(false);
  }

  return (
    <section>
      <p className="fs-4 fw-bold mb-3 text-center page-title">
        { MEAL_PLAN_STEPS.CHOOSE_YOUR_GOAL}
      </p>
      {
        showDisclaimer ?
        <VibrantPlannerDisclaimer handleBackClick={handleBackClick} />
        :
        <>
          <div className="goal-container">
            {goals.map((goal) => (
              <GoalCard
                key={goal}
                name={goal.name}
                icon={goal.icon}
                onClick={(e) => {handleClick(e, goal.value)}}
                isSelected={selectedGoal === goal.value}
              />
            ))}
            <GoalCard
              name={"I have Other Goal"}
              icon={Goal}
              onClick={(e) => {handleClick(e, "custom")}}
            />
          </div>
          <div className="d-flex btn-group vl-action-btn m-3">
            <button type="button" className="btn w-50p vl-go-back-btn" onClick={handleBack}>Go Back</button>
            <button type="button" className="btn w-50p vl-go-next-btn" 
              disabled={!isSelected}
              onClick={handleNextStep} >
                {NEXT}
            </button>
          </div>
        </>
      }
    </section>
  );
};

export default GoalList;
