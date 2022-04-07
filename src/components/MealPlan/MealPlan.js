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
        <div>
          <span>
            {!canChangeDuration ? `${duration} ${DAYS_PLAN}` : CUSTOM_PLAN}
          </span>
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
        {!canChangeDuration ? (
          <span>{`${servings} ${SERVINGS}`}</span>
        ) : (
          <>
            <Form.Control
              type="text"
              size="sm"
              value={customDuration}
              onChange={onCustomDurationChange}
            />
            dAYS
          </>
        )}
        <span>
          <BiRupee />
          {`${
            pricePerDay * (canChangeDuration ? customDuration : duration) +
            totalTaxes -
            discount
          }/-`}
        </span>
      </div>
    );
  }
);

export default MealPlan;
