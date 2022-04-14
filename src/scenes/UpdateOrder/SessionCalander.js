import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { ISO_FORMAT, SESSION_TYPES } from "../../utils/constants";
import MealDisplay from "./MealDisplay";
import { Calendar } from "react-multi-date-picker";

const SessionCalander = ({
  sessionCode,
  onSessionClick,
  mealDisplayName,
  deliveryType,
  duration,
  remainingDates,
  completedDates,
  disabled = false,
  checked,
  handleCalendarChange,
  sessionIndex,
}) => {
  const [activeDates, setActiveDates] = useState(remainingDates);
  const mapCalendarDates = (date) => {
    console.log("Map calandar days called");
    let props = {};
    props.style = {};
    if (completedDates.length > 0) {
      if (completedDates.includes(date.format(ISO_FORMAT))) {
        props.disabled = true;
        props.style.backgroundColor = "#f05922";
      }
    }
    return props;
  };
  useEffect(() => {
    handleCalendarChange([...remainingDates, ...completedDates], sessionIndex);
  }, []);
  const onCalandarChange = (dates) => {
    const isoFormattedDates = dates.map((date) => date.format(ISO_FORMAT));
    if (dates.length > duration) {
      setActiveDates(isoFormattedDates.slice(0, duration));
      return;
    }
    setActiveDates(isoFormattedDates);
    handleCalendarChange(
      [...isoFormattedDates, ...completedDates],
      sessionIndex
    );
  };
  return (
    <div className="mealPlannerCheck vl-checkbox-custom">
      <Form.Check
        type="checkbox"
        checked={checked}
        name={sessionCode}
        label={SESSION_TYPES[sessionCode]}
        onClick={onSessionClick}
        id={`session_checkbox_${sessionCode}`}
        disabled={true}
      />

      {!disabled && (
        <>
          <div className="meal-plan-wrapper px-0">
            <MealDisplay name={mealDisplayName} type={deliveryType} />
          </div>
          <div className="d-flex justify-content-start">
            <small className="font-weight-bold justify-content-start text-muted selected-duration px-0">{`selected ${
              completedDates?.length + activeDates?.length
            }/${duration} days`}</small>
          </div>
          <div className="calendar-container">
            <Calendar
              format="YYYY-MM-DD"
              multiple
              numberOfMonths={2}
              minDate={new Date()}
              value={activeDates}
              onChange={onCalandarChange}
              mapDays={({ date }) => mapCalendarDates(date)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SessionCalander;
