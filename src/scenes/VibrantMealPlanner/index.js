import React, { useState, useMemo, useEffect } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { MEAL_PLAN_STEPS, PICKUP, ADD_TO_CART, MALE, FEMALE } from "../../utils/constants";
import { createCartInput } from "../../store/actions/cart";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import MealList from "../../components/MealList/MealList";
import GoalList from "../../components/GoalList/GoalList";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import ProductPlanner from "../../components/ProductPlanner/ProductPlanner";
import AddressComponent from "./AddressComponent";
import { getMealPlanDetails, getOrderDates } from "./vibrantMealPlanner.utils";
import { FaWeight, FaLeaf, FaRegGrinHearts } from "react-icons/fa";
import { showLogin } from "../../store/actions";
import { clearDeliveryCharges } from "../../store/actions/addresses";
import "./styles.scss";
import DetoxMyBody from "../../assets/mealplanner/Detox.png";
import CustomDiet from "../../assets/mealplanner/CustomDiet.png";
import Weight from "../../assets/mealplanner/Weight.png";

const apiKey = "AIzaSyC6YxgAdZtGYuU2Isl9V4eDdbZfwPjAcAs";
let script = document.createElement("script");
const loadScript = (url) => {
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
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

const goals = [
  {
    name: "Manage My Weight",
    value: "MANAGEMYWEIGHT",
    icon: Weight
  },
  {
    name: "Detox My Body",
    value: "DETOXMYBODY",
    icon: DetoxMyBody
  },
  {
    name: "Have Delicious Healthy Food",
    value: "HEALTHYFOOD",
    icon: CustomDiet
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
    gender: FEMALE,
    heightFeet: 5,
    heightInch: 6,
    weight: 60,
    age: 30,
  });
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [deliveryType, setDeliveryType] = useState(PICKUP);
  const [selectedDuration, setSelectedDuration] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [mealPlans, setMealPlans] = useState([]);
  const [address, setAddress] = useState({});
  const [delivery, setDelivery] = useState({});
  const [addressSelected, setAddressSelected] = useState(false);
  const {
    display_name,
    category,
    defaultimg_url,
    description,
    meal_prices,
    variants,
    id: productId,
  } = selectedMeal;

  const { mealPlansList: mealList, loading: mealLoading } = useSelector(
    (state) => state.mealPlans
  );

  const customerId = useSelector((state) => state?.auth?.userDetails?.sub);

  const onMealProductClick = (meal) => {
    setSelectedMeal(meal);
  };

  const onMealPlanSelection = (duration) => setSelectedDuration(duration);

  const onSessionChange = (sessions) => {
    setSelectedSessions(sessions);
    refreshMealPlans(sessions);
  };

  const refreshMealPlans = (sessions = selectedSessions) => {
    const { delivery_charge, discount } = delivery;
    setMealPlans(
      getMealPlanDetails(
        sessions,
        meal_prices,
        variants[0],
        delivery_charge,
        discount
      )
    );
  };

  const onDeliveryTypeChange = (value) => {
    setDeliveryType(value);
  };

  const onStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const onAddToCart = () => {
    if (!customerId || customerId === "") {
      dispatch(showLogin());
    } else {
      dispatch(
        createCartInput({
          profileDetails,
          deliveryType,
          orderDates: getOrderDates(selectedDuration, selectedStartDate),
          duration: selectedDuration,
          customerId,
          productId,
          selectedSessions,
          address,
        })
      );
      dispatch(clearDeliveryCharges());
      history.push("/cart-summary");
    }
  };

  useEffect(() => {
    if (selectedDuration && selectedSessions.length > 0 && customerId !== "")
      onAddToCart();
  }, [customerId]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    );
    return () => {
      document.getElementsByTagName("head")[0].removeChild(script);
    };
  }, []);

  useEffect(() => {
    delivery?.delivery_charge && refreshMealPlans();
  }, [delivery]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
            onMealClick={onMealProductClick}
            handleNextStep={handleNext}
            selectedMealId={meal}
            handleCustomDiet={() =>
              history.push("/disclaimer?name=subscription")
            }
          />
        )}
        {activeStep === 1 && (
          <GoalList
            goals={goals}
            handleNextStep={handleNext}
            onGoalClick={setGoal}
            selectedGoal={goal}
            handleBack={handleBack}
          />
        )}
        {activeStep === 2 && (
          <PersonalInfo
            onProfileDetailsSubmit={setProfileDetails}
            defaultGender={profileDetails.gender}
            handleNextStep={handleNext}
            handleBack={handleBack}
          />
        )}
        {activeStep === 3 &&
          (deliveryType === PICKUP || addressSelected === true ? (
            <div className="px-0 text-center" style={{background:"#f5e0bc", paddingBottom:'20px'}}>
              <ProductPlanner
                productTitle={display_name}
                productCategory={category}
                imageUrl={defaultimg_url}
                productDescription={description}
                mealPlans={mealPlans}
                deliveryType={deliveryType}
                selectedSessions={selectedSessions}
                onSessionChange={onSessionChange}
                onStartDateChange={onStartDateChange}
                onMealPlanSelection={onMealPlanSelection}
                onDeliveryChange={onDeliveryTypeChange}
                setAddressSelected={setAddressSelected}
              />
              <div className="d-flex btn-group vl-action-btn m-3">
                <button type="button" className="btn w-50p vl-go-back-btn" onClick={handleBack}>Go Back</button>
                <button type="button" className="btn w-50p vl-go-next-btn" 
                  disabled={!selectedDuration || selectedSessions.length === 0} 
                  onClick={onAddToCart} >
                    {ADD_TO_CART}
                </button>
              </div>
            </div>
          ) : (
            <>
              <AddressComponent
                setAddress={setAddress}
                prevAddress={address}
                setDelivery={setDelivery}
                onDeliveryTypeChange={onDeliveryTypeChange}
                setAddressSelected={setAddressSelected}
              />
            </>
          ))}
      </div>
    </section>
  );
}

export default VibrantMealPlanner;
