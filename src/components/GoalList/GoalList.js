import React from "react";
import { useHistory } from "react-router-dom";
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import GoalCard from "../GoalCard/GoalCard";
import "./goalList.scss";
import { FaRegGrinHearts } from "react-icons/fa";

const GoalList = ({ handleBack, handleNextStep, selectedGoal, onGoalClick, goals }) => {
  const history = useHistory();
  const handleClick = (goal) => {
    onGoalClick(goal.value);
    handleNextStep();
  };

  return (
    <section style={{ background: "rgb(249, 243, 223)" }}>
      <p className="fs-4 fw-bold mb-3 text-center page-title">
        { MEAL_PLAN_STEPS.CHOOSE_YOUR_GOAL}
      </p>
      <div className="goal-container">
      {goals.map((goal) => (
          <GoalCard
            key={goal}
            name={goal.name}
            icon={goal.icon}
            onClick={() => handleClick(goal)}
            isSelected={selectedGoal === goal.value}
          />
        ))}
         <GoalCard
            name={"I have Other Goal"}
            icon={<FaRegGrinHearts />}
            onClick={() => history.push("/disclaimer")}
          />
      </div>
    </section>
  );
};

export default GoalList;
