import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import { getMealPlans } from "../../store/actions/mealPlans";
import { useHistory } from "react-router-dom";
import MealList from "../../components/MealList/MealList";
import "./styles.scss";
import { Button } from "react-bootstrap";

const apiKey = "AIzaSyC6YxgAdZtGYuU2Isl9V4eDdbZfwPjAcAs";
const loadScript = (url) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
      }
    };
  } else {
    script.onload = () => null;
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

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

  const { mealPlansList: mealList, loading: mealLoading } = useSelector(
    (state) => state.mealPlans
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    dispatch(getMealPlans());
  }, []);

  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`);
  }, []);

  return (
    <section className="planner-container">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="stepperComponent"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === 0 && (
          <MealList
            list={mealList}
            loading={mealLoading}
            onMealClick={setMeal}
            handleNextStep={handleNext}
            // selectedMeal={selectedMeal}
            handleCustomDiet={() => history.push("/disclaimer")}
          />
        )}
        {activeStep === 1 && <h1>Step 2</h1>}
        {activeStep === 2 && <h1>Step 3</h1>}
        {activeStep === 3 && <h1>Step 4</h1>}
      </div>
      <div className="stepper-btn-container">
        <Button
          className="w-50 m-1 stepper-btn"
          onClick={() => handleBack()}
          disabled={activeStep === 0 ? true : false}
        >
          Back
        </Button>
        <Button className="w-50 m-1 stepper-btn" onClick={() => handleNext()}>
          Next
        </Button>
      </div>
    </section>
  );
}

export default VibrantMealPlanner;
