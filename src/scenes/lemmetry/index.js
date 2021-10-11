import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import UserDetails from "./../Subscription/user-details";
import MealPlans from "../Subscription/second-step";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../store/actions/customer";
import PlannerWrapper from "./PlannerWrapper";
import { makeStyles } from "@material-ui/core";

function getSteps() {
  return ["Your details", "Select a Meal", "Plan Meal"];
}

const useStyles = makeStyles({
  stepIcon: {
    // background: "orange",
    color: "#f05922 !important",
  },
});

const LemmeTry = () => {
  const classes = useStyles();
  const steps = getSteps();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const userData = useSelector((state) => state.customer.custData);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleMyStepper = () => {
    if (activeStep === 0) {
      dispatch(createCustomer(userData));
    }
    handleNext();
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.stepIcon,
                  completed: classes.stepIcon,

                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep == 0 ? (
          <UserDetails handleNextStep={handleMyStepper} />
        ) : activeStep == 1 ? (
          <MealPlans handleBack={handleBack} handleNextStep={handleMyStepper} />
        ) : activeStep == 2 ? (
          <PlannerWrapper
            handleBack={handleBack}
            handleNextStep={handleMyStepper}
            isOnboarding={true}
          />
        ) : null}
      </div>
    </>
  );
};

export default LemmeTry;
