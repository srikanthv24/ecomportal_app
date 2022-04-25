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
    console.log("dates.length: " + JSON.stringify(dates.length));
    console.log(
      "completedDates.length: " + JSON.stringify(completedDates.length)
    );
    console.log("duration: " + duration);
    if (dates.length + completedDates.length > duration) {
      setActiveDates(
        isoFormattedDates.slice(0, duration - completedDates.length)
      );
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
      {address?.customer_name && (
        <div>
          Deliver To:
          {` ${address.aline1}, ${address.aline2}, ${address.community}, ${address.state}, ${address.landmark}, ${address.postalcode}`}
        </div>
      )}
      <div className="d-flex align-items-center vl-edit-time-stamp">
        <span className="vl-days-desp-info">
          <strong>{duration}</strong> Days Subscription
        </span>
        {subscriptionStartDate && (
          <div className="prdDesp vl-days-desp-info">
            Start on{" "}
            <strong>{getDateInTextFormat(subscriptionStartDate)}</strong>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between vl-edit-bal-stamp">
        <div className="vl-edit-bal-info">
          Delivered: <strong>{`${completedDates?.length}`}</strong>
        </div>
        <div className="vl-edit-bal-info">
          Paused:{" "}
          <strong>{`${
            duration - (completedDates?.length + activeDates?.length)
          }`}</strong>
        </div>
        <div className="vl-edit-bal-info">
          Balance: <strong>{`${activeDates?.length}`}</strong>
        </div>
        <div className="vl-edit-bal-info">
          <div className="meal-plan-wrapper px-0 vl-edit-cal-info">
            <CalendarLegend />
          </div>
        </div>
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
