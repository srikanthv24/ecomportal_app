import React, { useState } from "react";
import MealPlan from "../MealPlan/MealPlan";
import SessionCordinator from "../SessionCordinator";
import ProductDisplay from "./ProductDisplay";
import { PICKUP, DELIVERY, PLAN_YOUR_MEAL } from "../../utils/constants";
import _ from "underscore";
import { getTomorrowDate } from "../../utils/dateUtils";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
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
    const [startDate, setStartDate] = useState(getTomorrowDate);
    // const [deliveryType, setDeliveryType] = useState(PICKUP);
    const [mealSelectedIndex, setMealSelectedIndex] = useState();
    const onServiceChange = (value) => {
      onDeliveryChange(value);
      setAddressSelected(false);
    };
    const onDateChange = (date) => {
      const selectedDate = date.format("YYYY-MM-DD");
      setStartDate(selectedDate);
      onStartDateChange(selectedDate);
    };
    const onMealClick = (duration, index) => {
      setMealSelectedIndex(index);
      onMealPlanSelection(duration);
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
            render={<InputIcon />}
            editable={false}
            minDate={moment().format("YYYY-MM-DD")}
          />
        </div>

        <div className="mealplan-address-block">
          <div className="d-flex btn-group vl-action-btn">
            <button type="button" 
              className={`btn btn-pickup ${deliveryType === PICKUP ? "checked w-50p" : "w-50p"}`} 
              onClick={() => {onServiceChange(PICKUP)}}>
                {PICKUP}
            </button>
            <button type="button" 
              className={`btn btn-delivery ${deliveryType === DELIVERY ? "checked w-50p" : "w-50p"}`} 
              onClick={() => {onServiceChange(DELIVERY)}}>
                {DELIVERY}
                <div className="deliveryArrow"></div>
            </button>
          </div>
        </div>
        <div className="meal-plan-wrapper">
          {selectedSessions.length > 0 && (
            <>
              <h4 className="title-info">{PLAN_YOUR_MEAL}</h4>
              {mealPlans.map((plan, index) => {
                return (
                  <MealPlan
                    {...plan}
                    onMealClick={(duration) => onMealClick(duration, index)}
                    deliveryType={deliveryType}
                    isActive={mealSelectedIndex === index}
                  />
                );
              })}
            </>
          )}
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
