import React from "react";
import { Spinner } from "react-bootstrap";
import MealCard from '../MealCard/MealCard';
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import './meallist.scss';


const MealList = ({ handleNextStep, selectedMeal, onMealClick,loading, list, handleCustomDiet}) => {
  const handleClick = (mealId) => {
    onMealClick(mealId);
    handleNextStep();
  };

  return (
    <section style={{ background: "rgb(249, 243, 223)" }}>
      <p className="fs-4 fw-bold mb-3 text-center page-title">
        {MEAL_PLAN_STEPS.CHOOSE_YOUR_MEAL}
      </p>
      <div className="meal-container">
        {loading && <Spinner className="meal-spinner" animation="border" />}
        {list &&
          list.length > 0 &&
          list.map((meal) => (
            <MealCard
              key={meal.id}
              isSelected={selectedMeal === meal.id}
              onClick={() => handleClick(meal.id)}
              name={meal.display_name}
              mealImgUrl={meal.defaultimg_url}
            />
          ))}
      </div>
      <div
        className="custom-diet-btn my-3"
        onClick={handleCustomDiet}
      >{MEAL_PLAN_STEPS.CUSTOM_DIET}</div>
    </section>
  );
};

export default MealList;
