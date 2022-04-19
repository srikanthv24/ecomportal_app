import React, { useEffect, useState } from "react";
import MealDisplay from "./MealDisplay";
import SessionCordinator from "../../components/SessionCordinator";
import CalanderSessionCordinator from "./CalanderSessionCordinator";
import ProductDisplay from "../../components/ProductPlanner/ProductDisplay";
import _ from "underscore";
import moment from "moment";
import DeliverySwitch from "../../components/DeliverySwitch/DeliverySwitch";
import { PICKUP, DELIVERY } from "../../utils/constants";

const EditSubscription = React.memo(
  ({
    productTitle,
    productCategory,
    imageUrl,
    productDescription,
    mealDisplayName,
    inputs,
    selectedSessions,
    deliveryType,
    orderDates,
    duration: planDuration,
    handleCalendarChange,
  }) => {
    return (
      <div className="product-planner">
        <ProductDisplay
          title={productTitle}
          category={productCategory}
          imageUrl={imageUrl}
          description={productDescription}
        />
        <CalanderSessionCordinator
          selectedSessions={selectedSessions}
          sessionCodes={["B", "L", "D"]}
          mealDisplayName={mealDisplayName}
          deliveryType={deliveryType}
          duration={planDuration}
          handleCalendarChange={handleCalendarChange}
          orderDates={orderDates}
        />

        <div className="mealPlan-date"></div>
        {/* <DeliverySwitch deliveryType={inputs.deliveryType} disabled={true} /> */}
        <div className="mealplan-address-block">
          <div className="w-100p meal-transport vlradio-toolbar">
            <div className="form-check form-check-inline mr-1 my-0 px-0">
              <input
                className="form-check-input"
                type="radio"
                name="order-type"
                id={PICKUP}
                checked={inputs.deliveryType === PICKUP ? true : false}
                value={PICKUP}
                disabled
              />
              <label className="form-check-label" htmlFor={PICKUP}>
                Pickup
              </label>
            </div>
            <div className="form-check form-check-inline ml-1 my-0 px-0 relative">
              <input
                className="form-check-input"
                type="radio"
                name="order-type"
                id={DELIVERY}
                checked={inputs.deliveryType === DELIVERY ? true : false}
                value={DELIVERY}
                disabled
              />
              <label className="form-check-label" htmlFor={DELIVERY}>
                Delivery
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EditSubscription;
