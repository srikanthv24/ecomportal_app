import React, { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import MealPlanner from "./MealPlanner";
import SessionCordinator from "../../components/SessionCordinator";
import ProductDisplay from "../../components/ProductPlanner/ProductDisplay";
import _ from "underscore";
import moment from "moment";
import DeliverySwitch from "../../components/DeliverySwitch/DeliverySwitch";

const ProductPlanner = ({
  productTitle,
  productCategory,
  imageUrl,
  productDescription,
  inputs,
  setInputs,
  setDisable,
  setNewDates,
}) => {
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [completedDates, setCompletedDates] = useState([]);
  const [remainingDates, setRemainingDates] = useState([]);
  const [planDuration, setPlanDuration] = useState(0);

  useEffect(() => {
    inputs?.variants?.map((item) =>
      item.display_name === "Duration"
        ? setPlanDuration(item?.items[0]?.display_name.replace(/[^\d]/g, ""))
        : setPlanDuration(0)
    );

    if (inputs?.orderDate && inputs?.orderDate?.length > 0) {
      let sessionOrderDates = inputs.orderDate[0];
      const completedDates = sessionOrderDates?.filter(
        (date) => moment(date, "YYYY-MM-DD") < moment(new Date(), "YYYY-MM-DD")
      );
      setCompletedDates(completedDates);

      const remainingDates = sessionOrderDates.filter(
        (date) => moment(date, "YYYY-MM-DD") > moment(new Date(), "YYYY-MM-DD")
      );
      setRemainingDates(remainingDates);
    }
  }, [inputs]);

  const mapCalendarDates = (date) => {
    let props = {};
    props.style = {};
    if (completedDates.length > 0) {
      if (completedDates.includes(date.format("YYYY-MM-DD"))) {
        props.disabled = true;
        props.style.backgroundColor = "#f05922";
      }
    }
    return props;
  };

  const handleCalendarChange = (dateObj) => {
    let temp = [...remainingDates];
    if (completedDates?.length + dateObj?.length > planDuration) {
    } else {
      let abc = [];
      dateObj.forEach((date) => {
        abc.push(date.format("YYYY-MM-DD"));
      });
      temp = abc;
    }
    setRemainingDates(temp);
  }

  useEffect(() => {
    if (
      remainingDates.length + completedDates.length ===
      parseInt(planDuration)
    ) {
      setDisable(false);
      const newDates = [...completedDates, ...remainingDates];
      setNewDates(newDates);
    } else {
      setDisable(true);
    }
  },[remainingDates])

  
  return (
    <div className="product-planner">
      <ProductDisplay
        title={productTitle}
        category={productCategory}
        imageUrl={imageUrl}
        description={productDescription}
      />
      <SessionCordinator
        selectedSessions={inputs.selectedSessions}
        sessionCodes={["B", "L", "D"]}
        disabled={true}
      />
      <div className="d-flex justify-content-start">
        <small className="font-weight-bold justify-content-start text-muted selected-duration">{`selected ${
          completedDates?.length + remainingDates?.length
        }/${planDuration} days`}</small>
      </div>
      <div className="calendar-container">
        <Calendar
          format="YYYY-MM-DD"
          multiple
          numberOfMonths={2}
          minDate={new Date()}
          value={remainingDates}
          onChange={(dateObj) => handleCalendarChange(dateObj)}
          mapDays={({ date }) => mapCalendarDates(date)}
        />
      </div>
      <div className="mealPlan-date"></div>
      <DeliverySwitch deliveryType={inputs.deliveryType} disabled={true} />
      <div className="meal-plan-wrapper">
        {inputs?.variants[0]?.items.map((variant) => (
          <MealPlanner variant={variant} type={inputs?.deliveryType} />
        ))}
      </div>
    </div>
  );
};

export default ProductPlanner;
