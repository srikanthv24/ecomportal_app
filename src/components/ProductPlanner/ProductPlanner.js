import React, { useState } from "react";
import MealPlan from "../MealPlan/MealPlan";
import SessionCordinator from "../SessionCordinator";
import ProductDisplay from "./ProductDisplay";
import { PICKUP, DELIVERY } from "../../utils/constants";
import _ from "underscore";
import { getTomorrowDate } from "../../utils/dateUtils";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import moment from "moment";

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
    selectedSessions,
    setAddressSelected,
  }) => {
    console.log(
      "selectedSessions in product planner: " + JSON.stringify(selectedSessions)
    );
    const [startDate, setStartDate] = useState(getTomorrowDate);
    // const [deliveryType, setDeliveryType] = useState(PICKUP);
    const onServiceChange = (e) => {
      const { value } = e.target;
      onDeliveryChange(value);
      if (value === PICKUP) {
        setAddressSelected(false);
      }
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
          selectedSessions={selectedSessions}
          sessionCodes={["B", "L", "D"]}
        />
        <div className="mealPlan-date">
          <DatePicker
            // placeholder="Select Start Date"
            name="start-date"
            className="order-form-control-input"
            value={startDate}
            onChange={onDateChange}
            render={<InputIcon/>}
            editable={false}
            minDate={moment().format("YYYY-MM-DD")}
          />
        </div>

        <div className="mealplan-address-block">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="order-type"
              id={PICKUP}
              defaultChecked={deliveryType === PICKUP ? true : false}
              onChange={onServiceChange}
              value={PICKUP}
            />
            <label className="form-check-label" htmlFor={PICKUP}>
              Pickup
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="order-type"
              id={DELIVERY}
              defaultChecked={deliveryType === DELIVERY ? true : false}
              onChange={onServiceChange}
              value={DELIVERY}
            />
            <label className="form-check-label" htmlFor={DELIVERY}>
              Delivery
            </label>
          </div>
        </div>
        <div className="meal-plan-wrapper">
          <h4 className="title-info">Plan your Meal</h4>
          {selectedSessions.length > 0 &&
            mealPlans.map((plan) => {
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
