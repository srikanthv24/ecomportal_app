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
import { ImportantDevices } from "@material-ui/icons";

function getSteps() {
  return ["Profile", "Meal Plan", "Schedule"];
}

const useStyles = makeStyles({
  stepIcon: {
    // background: "orange",
    color: "#f05922 !important",
  },
  stepLabel: {
    marginTop: 5,
  },
  stepperBg:{
    background:"rgb(249, 243, 223) !important",
    minHeight:'100vh',
    paddingTop:'100px',
    '& > $div':{
      background:"rgb(249, 243, 223) !important",
    }
  }
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
    <section className={classes.stepperBg}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.stepIcon,
                  completed: classes.stepIcon,
                  label: classes.stepLabel,
                  alternativeLabel: classes.stepLabel,
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
    </section>
  );
};

export default LemmeTry;
