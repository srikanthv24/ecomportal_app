import React from "react";
import { DELIVERY, PICKUP } from "../../utils/constants";

const DeliverySwitch = ({
  deliveryType,
  onServiceChange,
  disabled = false,
  showDeliverySwitch,
}) => {
  console.log(
    "deliveryType in delivery switch: "+ showDeliverySwitch + JSON.stringify(deliveryType)
  );
  return (
    <div
      className={
        showDeliverySwitch
          ? "show-calander mealplan-address-block"
          : "hide-calander mealplan-address-block"
      }
    >
      <div className="w-100p meal-transport vlradio-toolbar">
        <div className="form-check form-check-inline mx-0 my-0 px-0 w-50p">
          <input
            className="form-check-input"
            type="radio"
            name="order-type"
            id={PICKUP}
            checked={deliveryType === PICKUP ? true : false}
            onChange={onServiceChange}
            value={PICKUP}
            disabled={disabled}
          />
          <label className="form-check-label" htmlFor={PICKUP}>
            {PICKUP}
          </label>
        </div>
        <div className="form-check form-check-inline mx-0 my-0 px-0 w-50p relative">
          <input
            className="form-check-input"
            type="radio"
            name="order-type"
            id={DELIVERY}
            checked={deliveryType === DELIVERY ? true : false}
            onChange={onServiceChange}
            value={DELIVERY}
            disabled={disabled}
          />
          <label className="form-check-label" htmlFor={DELIVERY}>
            {DELIVERY}
          </label>
          <div className="deliveryArrow"></div>
        </div>
      </div>
    </div>
  );
};

export default DeliverySwitch;
