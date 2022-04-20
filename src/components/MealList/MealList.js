import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MealCard from "../MealCard/MealCard";
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import "./meallist.scss";
import { getMealPlans } from "../../store/actions/mealPlans";
import { useDispatch } from "react-redux";

const MealList = ({
  handleNextStep,
  selectedMealId,
  onMealClick,
  loading,
  list,
  handleCustomDiet,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMealPlans())
  }, [])
  
  
  const handleClick = (selectedMeal) => {
    onMealClick(selectedMeal);
    handleNextStep();
  };

  return (
    <section>
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
              isSelected={selectedMealId === meal.id}
              onClick={() => handleClick(meal)}
              name={meal.display_name}
              mealImgUrl={meal.defaultimg_url}
            />
          ))}
      </div>
      <div className="custom-diet-btn mb-3" onClick={handleCustomDiet}>
        {MEAL_PLAN_STEPS.CUSTOM_DIET}
      </div>
    </section>
  );
};

export default MealList;
