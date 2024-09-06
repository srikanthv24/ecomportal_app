import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { ChooseCuisine, ChooseGoal, ProfileDetails } from "./../Subscription";
import { useDispatch, useSelector } from "react-redux";
import PlannerWrapper from "./PlannerWrapper";
import { makeStyles } from "@material-ui/core";
import { AddressModal } from "../Products/address-modal";

function getSteps() {
  return ["Cuisine", "Goal", "Profile", "Schedule"];
}

const useStyles = makeStyles({
  stepIcon: {
    // background: "orange",
    color: "#f05922 !important",
  },
  stepLabel: {
    marginTop: 5,
  },
  stepperBg: {
    background: "rgb(249, 243, 223) !important",
    minHeight: "100vh",
    paddingTop: "70px",
    "& > $div": {
      paddingTop:'15px',
      paddingBottom:'15px',
      background: "rgb(249, 243, 223) !important",
    },
    "& .ProductDetailsSection": {
      paddingTop:'0px',
    }
  },
});

const LemmeTry = () => {
  const classes = useStyles();
  const steps = getSteps();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const userData = useSelector((state) => state.customer.custData);

  const [cuisine, setCuisine] = useState("");
  const [goal, setGoal] = useState("");
  const [profileDetails, setProfileDetails] = useState({
    gender: "",
    age: "",
    heightFeet: "",
    heightInch: "",
    weight: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleMyStepper = () => {
    // if (activeStep === 1) {
    //   dispatch(createCustomer(userData));
    // }
    handleNext();
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <section className={classes.stepperBg}>
      <AddressModal
        // customerId={userDetails.sub}
        handleClose={() => setShowModal(false)}
        handleShow={handleShow}
        showModal={showModal}
      />
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
        {activeStep === 0 && (
          <ChooseCuisine
            handleNextStep={handleMyStepper}
            selectedCuisine={cuisine}
            setCuisine={setCuisine}
          />
        )}
        {activeStep === 1 && (
          <ChooseGoal
            handleBack={handleBack}
            handleNextStep={handleMyStepper}
            selectedGoal={goal}
            setGoal={setGoal}
          />
        )}
        {activeStep === 2 && (
          <ProfileDetails
            handleBack={handleBack}
            handleNextStep={handleMyStepper}
            profileDetails={profileDetails}
            setProfileDetails={setProfileDetails}
          />
        )}
        {activeStep === 3 && (
          <PlannerWrapper
            handleBack={handleBack}
            handleNextStep={handleMyStepper}
            isOnboarding={true}
            goal={goal}
            cuisine={cuisine}
            profileDetails={profileDetails}
          />
        )}
      </div>
    </section>
  );
};

export default LemmeTry;
