import React, { useState } from "react";
import MealPlan from "../MealPlan/MealPlan";
import SessionCordinator from "../SessionCordinator";
import ProductDisplay from "./ProductDisplay";
import {
  PICKUP,
  DELIVERY,
  CHOOSE_YOUR_MEAL,
  INDIAN_DATE_FORMAT,
  CHOOSE_DELIVERY_TYPE,
  START_ON,
} from "../../utils/constants";
import _ from "underscore";
import {
  getTomorrowDate,
  getTodayDate,
  getDateInIndianFormat,
} from "../../utils/dateUtils";
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
    mealSelectedIndex,
    setMealSelectedIndex,
  }) => {
    const [startDateInIndianFormat, setStartDateInIndianFormat] = useState(
      getDateInIndianFormat(getTomorrowDate())
    );

    const onServiceChange = (value) => {
      onDeliveryChange(value);
      setAddressSelected(false);
    };
    const onDateChange = (date) => {
      setStartDateInIndianFormat(date.format(INDIAN_DATE_FORMAT));
      onStartDateChange(new Date(date));
    };
    const onMealClick = (e, duration, index) => {
      e.preventDefault();
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
        <div className="vl-prd-planner-design1">
          <SessionCordinator
            onSessionChange={onSessionChange}
            selectedSessions={selectedSessions}
            sessionCodes={["B", "L", "D"]}
          />
        </div>
        <div className="meal-plan-wrapper">
          {selectedSessions.length > 0 && (
            <>
              <h4 className="title-info">{CHOOSE_YOUR_MEAL}</h4>
              {mealPlans.map((plan, index) => {
                return (
                  <MealPlan
                    {...plan}
                    onMealClick={onMealClick}
                    mealPlanIndex={index}
                    deliveryType={deliveryType}
                    isActive={mealSelectedIndex === index}
                  />
                );
              })}
            </>
          )}
        </div>

        <div className="mealplan-address-block">
          <h4 className="title-info">{CHOOSE_DELIVERY_TYPE}</h4>
          <div className="d-flex btn-group vl-action-btn">
            <button
              type="button"
              className={`btn btn-pickup ${
                deliveryType === PICKUP ? "checked w-50p" : "w-50p"
              }`}
              onClick={() => {
                onServiceChange(PICKUP);
              }}
            >
              {PICKUP}
            </button>
            <button
              type="button"
              className={`btn btn-delivery ${
                deliveryType === DELIVERY ? "checked w-50p" : "w-50p"
              }`}
              onClick={() => {
                onServiceChange(DELIVERY);
              }}
            >
              {DELIVERY}
              <span className="deliveryArrow"></span>
            </button>
          </div>
        </div>
        <div className="mealPlan-date">
          <h4 className="title-info">{START_ON}</h4>
          <DatePicker
            placeholder="Select Start Date"
            name="subscription-start-date"
            isSearchable={false}
            className="order-form-control-input"
            value={startDateInIndianFormat}
            onChange={onDateChange}
            render={<InputIcon readOnly />}
            format={INDIAN_DATE_FORMAT}
            minDate={getTodayDate()}
          />
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
