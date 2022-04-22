import React, { useEffect, useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import { ISO_FORMAT, SESSION_TYPES } from "../../utils/constants";
import MealDisplay from "./MealDisplay";
import { Calendar } from "react-multi-date-picker";
import { getGracePeriod } from "./updateOrder.utils";
import CalendarLegend from "../../components/CalendarLegend";
import { getDateInTextFormat } from "../../utils/dateUtils";

const SessionCalander = ({
  sessionCode,
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
  showCalander,
}) => {
  console.log(
    "subscriptionStartDate: " + JSON.stringify(subscriptionStartDate)
  );
  console.log("grace: " + JSON.stringify(grace));
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
    <div className={showCalander ? "show-calander" : "hide-calander"}>
      <div className="meal-plan-wrapper px-0">
        <CalendarLegend />
      </div>
      {address?.customer_name && (
        <div>
          Deliver To:
          {` ${address.aline1}, ${address.aline2}, ${address.community}, ${address.state}, ${address.landmark}, ${address.postalcode}`}
        </div>
      )}
      <span>{duration} Days Subscription</span>
      {subscriptionStartDate && (
        <div className="prdDesp">
          Start on: {getDateInTextFormat(subscriptionStartDate)}
        </div>
      )}
      <div className="d-flex justify-content-start">
        <small className="font-weight-bold justify-content-start text-muted selected-duration px-0">
          {`Delivered: ${completedDates?.length} 
              Paused: ${
                duration - (completedDates?.length + activeDates?.length)
              }
              Balance: ${activeDates?.length}
              `}
        </small>
      </div>

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
    </div>
  );
};

export default SessionCalander;
