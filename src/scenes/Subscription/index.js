import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import { Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
// import FirstStep from './FirstStep/index';
import UserDetails from "./user-details";
// import SecondStep from './SecondStep/index';
import MealPlans from "./second-step";
import ThirdStep from "./ThirdStep";
// import FourthStep from './FourthStep/index';

import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../store/actions/customer";
// import { postMealOrderData } from '../../store/actions/orderMeal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["User Details", "Meal Plans", "Select a Meal", "Cart"];
}

function Subscription() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  //const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.customer.custData);
  //   const orderMealData = useSelector( state => state.orderMeal.orderMealData);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <UserDetails
            handleBack={handleBack}
            handleNextStep={handleMyStepper}
            activeStep={activeStep}
          />
        );
      case 1:
        return <MealPlans handleNextStep={handleNext} />;
      case 2:
        return (
          <ThirdStep handleNextStep={handleMyStepper} handleBack={handleBack} />
        );
      //       case 3:
      //           return <FourthStep
      //                     handleNextStep={handleMyStepper}
      //                     handleBack={handleBack}
      //                     />;
      //       default:
      //         return <FirstStep />;
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMyStepper = () => {
    if (activeStep === 0) {
      console.log("dispatch fn from stepper component:::", userData);
      dispatch(createCustomer(userData));
      // } else if(activeStep === 1) {
      //   console.log("handle dispatch from active step 2");
      // }
      // else if(activeStep === 2) {
      //   console.log("handle dispatch from active step 3");
      //   dispatch(postMealOrderData(orderMealData));
      // }else if(activeStep === 3) {
      //   console.log("handle dispatch from active step 4");
    }

    handleNext();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <div style={{ height: "90vh" }}>
        <p className="fs-4 fw-bold m-3 p-1 text-center">USER ONBOARDING</p>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepButton onClick={handleStep(index)}>{label}</StepButton>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Fragment>{getStepContent(activeStep)} </Fragment>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
