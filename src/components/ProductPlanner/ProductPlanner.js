import React, { useState } from "react";
import MealPlan from "../MealPlan/MealPlan";
import SessionCordinator from "../SessionCordinator";
import ProductDisplay from "./ProductDisplay";
import { PICKUP, DELIVERY } from "../../utils/constants";
import _ from "underscore";
import { getTomorrowDate } from "../../utils/dateUtils";
import DatePicker from "react-multi-date-picker";

const ProductPlanner = React.memo(
  ({
    productTitle,
    productCategory,
    imageUrl,
    productDescription,
    mealPlans,
    onSessionChange,
    onStartDateChange,
    onMealPlanSelection,
    onDeliveryChange,
    deliveryType,
  }) => {
    const [startDate, setStartDate] = useState(getTomorrowDate);
    const onServiceChange = () => {
      onDeliveryChange();
    };
    const onDateChange = (date) => {
      const selectedDate = date.format("YYYY-MM-DD");
      setStartDate(selectedDate);
      onStartDateChange(selectedDate);
    };
    return (
      <div className="product-planner">
        <ProductDisplay
          title={productTitle}
          category={productCategory}
          imageUrl={imageUrl}
          description={productDescription}
        />
        <SessionCordinator
          onSessionChange={onSessionChange}
          sessionCodes={["B", "L", "D"]}
        />
        <div className="mealPlan-date">
        <DatePicker
          name="start-date"
          className="order-form-control-input"
          value={startDate}
          onChange={onDateChange}
        />
        </div>
        
        <div className="mealplan-address-block">
          <input
            type="radio"
            id="pick-up"
            value={PICKUP}
            checked
            onChange={onServiceChange}
          />
          <label for="pick-up">{PICKUP}</label>
          <input
            type="radio"
            id="delivery"
            value={DELIVERY}
            onChange={onDeliveryChange}
          />
          <label for="delivery">{DELIVERY}</label>
        </div>
        <div className="meal-plan-wrapper">
          {mealPlans.map((plan) => {
            return (
              <MealPlan
                {...plan}
                onMealClick={onMealPlanSelection}
                deliveryType={deliveryType}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
const areMealPlansEqual = (prevProps, nextProps) => {
  const { mealPlans: prevMealPlans } = prevProps;
  const { mealPlans: nextMealPlans } = nextProps;
  return _.isEqual(_.sortBy(prevMealPlans), _.sortBy(nextMealPlans));
};

export default ProductPlanner;
