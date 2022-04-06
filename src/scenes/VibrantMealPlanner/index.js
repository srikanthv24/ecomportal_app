import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { MEAL_PLAN_STEPS } from "../../utils/constants";
import { getMealPlans } from "../../store/actions/mealPlans";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import MealList from "../../components/MealList/MealList";
import GoalList from "../../components/GoalList/GoalList";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import { FaWeight, FaLeaf, FaRegGrinHearts } from "react-icons/fa";
import "./styles.scss";

function getSteps() {
  return [
    MEAL_PLAN_STEPS.CHOOSE_YOUR_MEAL,
    MEAL_PLAN_STEPS.CHOOSE_YOUR_GOAL,
    MEAL_PLAN_STEPS.MY_PROFILE,
    MEAL_PLAN_STEPS.SCHEDULE,
  ];
}

const goals = [
  {
    name: "Manage My Weight",
    value: "MANAGEMYWEIGHT",
    icon: <FaWeight />,
  },
  {
    name: "Detox My Body",
    value: "DETOXMYBODY",
    icon: <FaLeaf />,
  },
  {
    name: "Have Delicious Healthy Food",
    value: "HEALTHYFOOD",
    icon: <FaRegGrinHearts />,
  },
];

function VibrantMealPlanner() {
  const steps = getSteps();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [meal, setMeal] = useState("");
  const [goal, setGoal] = useState("");
  const [profileDetails, setProfileDetails] = useState({
    gender: "Male",
    heightFeet: 0,
    heightInch: 0,
    weight: 0,
    age: 0,
  });

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
            selectedMealId={meal}
            handleCustomDiet={() => history.push("/disclaimer")}
          />
        )}
        {activeStep === 1 && (
          <GoalList
            goals={goals}
            handleNextStep={handleNext}
            onGoalClick={setGoal}
            selectedGoal={goal}
          />
        )}
        {activeStep === 2 && (
          <PersonalInfo
            onProfileDetailsSubmit={setProfileDetails}
            defaultGender={profileDetails.gender}
            defaultHeightFeet={profileDetails.heightFeet}
            defaultHeightInch={profileDetails.heightInch}
            defaultWeight={profileDetails.weight}
            defaultAge={profileDetails.weight}
          />
        )}
        {activeStep === 3 && <h1>Step 4</h1>}
      </div>
      <div className="stepper-btn-container">
        <Button
          className="w-50 m-1 stepper-btn"
          onClick={handleBack}
          disabled={activeStep === 0 ? true : false}
        >
          Back
        </Button>
        <Button className="w-50 m-1 stepper-btn" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  );
}

export default VibrantMealPlanner;
