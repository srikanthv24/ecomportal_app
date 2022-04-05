import React, { Fragment, useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import ChooseMeal from "./ChooseMeal";
import { getMealPlans } from "../../store/actions/mealPlans";
import { useHistory } from "react-router-dom";

function getSteps() {
  return [
    MEAL_PLAN_STEPS.CHOOSE_YOUR_MEAL,
    MEAL_PLAN_STEPS.CHOOSE_YOUR_GOAL,
    MEAL_PLAN_STEPS.MY_PROFILE,
    MEAL_PLAN_STEPS.SCHEDULE,
  ];
}

function VibrantMealPlanner() {
  const steps = getSteps();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [meal, setMeal] = useState("");

  const { mealPlansList: mealList, loading: mealLoading } = useSelector((state) => state.mealPlans);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    dispatch(getMealPlans());
  }, [dispatch])
  
  console.log("meal_iddd", meal);

  return (
    <section className="planner-container">
      <Stepper activeStep={activeStep} alternativeLabel className="stepperComponent">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === 0 && (
          <ChooseMeal
            list={mealList}
            loading={mealLoading}
            setMeal={setMeal}
            handleNextStep={handleNext}
            // selectedMeal={selectedMeal}
            handleCustomDiet={() => history.push("/disclaimer")}
          />
        )}
        {activeStep === 1 && <h1>Step 2</h1>}
        {activeStep === 2 && <h1>Step 3</h1>}
        {activeStep === 3 && <h1>Step 4</h1>}
      </div>
    </section>
  );
}

export default VibrantMealPlanner;
