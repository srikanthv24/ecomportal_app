import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CUSTOM_PLAN, DAYS_PLAN, SERVINGS } from "../../utils/constants";
import { BiRupee } from "react-icons/bi";

const MealPlan = React.memo(
  ({
    duration,
    servings,
    deliveryType,
    pricePerDay,
    canChangeDuration,
    onMealClick,
    totalTaxes,
    discount,
    onDurationChange,
  }) => {
    const [customDuration, setCustomDuration] = useState(
      canChangeDuration ? duration : 0
    );
    const onCustomDurationChange = (e) => {
      const numberRegix = /^[0-9\b]+$/;
      const customDuration = e.target.value;
      if (customDuration === "" || numberRegix.test(customDuration)) {
        setCustomDuration(customDuration);
      }
    };
    console.log("discount in meal plan: " + JSON.stringify(discount));
    return (
      <div
        className="meal-card"
        onClick={() =>
          onMealClick(canChangeDuration ? customDuration : duration)
        }
      >
        <div className="w-100p plan-meal-card-sec">
          <div className="d-flex d-flex justify-content-between">
            <div className="items">
              <span className="daysinfo text-left plan-title-txt">
                {!canChangeDuration ? `${duration} ${DAYS_PLAN}` : CUSTOM_PLAN}
              </span>
              <span className="daysinfo d-flex servings-info-txt">
                {!canChangeDuration ? (
                  <span>{`${servings} ${SERVINGS}`}</span>
                ) : (
                  <div className="custom-plan-input-sec">
                    <Form.Control
                      type="number"
                      size="sm"
                      value={customDuration}
                      onChange={onCustomDurationChange} style={{width:'60px',marginRight:'10px'}}
                    />
                    Days
                  </div>
                )}
              </span>
            </div>
            <div className="items">
              {!canChangeDuration && (
                <span>
                  {deliveryType === "Pickup" ? (
                    <i class="fa-solid fa-truck"></i>
                  ) : (
                    <i class="fa-solid fa-location-check"></i>
                  )}
                </span>
              )}
            </div>
          </div>
         
          <div className="d-flex d-flex justify-content-end">
            <span className="amountInfo">
              <BiRupee />
              {`${pricePerDay * (canChangeDuration ? customDuration : duration) +
                totalTaxes -
                discount
                }/-`}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default MealPlan;
