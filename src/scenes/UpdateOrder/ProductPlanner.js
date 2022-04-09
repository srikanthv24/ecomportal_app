import React, { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import MealPlanner from "./MealPlanner";
import SessionCordinator from "./SessionCoordinators";
import ProductDisplay from "../../components/ProductPlanner/ProductDisplay";
import { PICKUP, DELIVERY } from "../../utils/constants";
import _ from "underscore";
// import { getTomorrowDate } from "../../utils/dateUtils";
// import DatePicker from "react-multi-date-picker";
// import InputIcon from "react-multi-date-picker/components/input_icon"
// import moment from "moment";

const ProductPlanner = ({
    productTitle,
    productCategory,
    imageUrl,
    productDescription,
    inputs,
    setInputs
  }) => {
    const today = new Date()
    const tomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)

    const [values, setValues] = useState([inputs.orderDate]);

    // useEffect(() => {
    //   setValues(inputs.orderDate);
    // }, [inputs])

    useEffect(() => {
      console.log(new Date(values[0]));
    }, [values])

    return (
      <div className="product-planner">
        <ProductDisplay
          title={productTitle}
          category={productCategory}
          imageUrl={imageUrl}
          description={productDescription}
        />
        <SessionCordinator
          sessions={inputs.selectedSessions}
          sessionCodes={["B", "L", "D"]}
        />
        <Calendar
          value={values}
          format="YYYY-MM-DD"
          multiple
          numberOfMonths={2}
          minDate={new Date()}
          style={{ width: "100%" }}
          onChange={setValues}
        />
        <div className="mealPlan-date">
          
        </div>

        <div className="mealplan-address-block">
          <div className="form-check form-check-inline">
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
          <div className="form-check form-check-inline">
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
        <div className="meal-plan-wrapper">
          {
            inputs?.variants[0]?.items.map((variant) => (
              <MealPlanner variant={variant} type={inputs?.deliveryType} />
            ))
          }
        </div>
      </div>
    );
  }

export default ProductPlanner;
