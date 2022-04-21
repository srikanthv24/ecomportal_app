import React, { useEffect, useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import { ISO_FORMAT, SESSION_TYPES } from "../../utils/constants";
import MealDisplay from "./MealDisplay";
import { Calendar } from "react-multi-date-picker";
import { getGracePeriod } from "./updateOrder.utils";
import CalendarLegend from "../../components/CalendarLegend";

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
  subscriptionStartDate,
  grace,
  address,
}) => {
  const [activeDates, setActiveDates] = useState(remainingDates);
  const mapCalendarDates = (date) => {
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
  const maxDate = useMemo(
    () => getGracePeriod(grace, subscriptionStartDate),
    [grace, subscriptionStartDate]
  );
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
            <CalendarLegend />
          </div>
          <div className="d-flex justify-content-start">
            <small className="font-weight-bold justify-content-start text-muted selected-duration px-0">
              {`Delivered ${completedDates?.length} out of total of ${duration}
              meals.
              Deliveries scheduled for ${activeDates?.length} more meals.
              Balance ${
                duration - (completedDates?.length + activeDates?.length)
              }
              unscheduled meal deliveries.`}
            </small>
          </div>
          {address?.customer_name && (
            <div>
              Deliver To:
              {` ${address.aline1}, ${address.aline2}, ${address.community}, ${address.state}, ${address.landmark}, ${address.postalcode}`}
            </div>
          )}
          <div className="calendar-container">
            <Calendar
              format="YYYY-MM-DD"
              multiple
              numberOfMonths={2}
              minDate={subscriptionStartDate}
              maxDate={maxDate}
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
