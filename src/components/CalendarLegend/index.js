import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import "./calendarLegend.scss";

const popover = (
  <Popover id="calendar-overlay">
    <Popover.Header as="h3" className="vl-edit-legends-bg">Legend</Popover.Header>
    <Popover.Body className="vl-edit-cal-info-sec">
      <div className="d-flex vl-edit-cal-info-sec align-items-center">
        <b className="calendar-circle mx-1 color-delievered"></b>
        <p className="vl-info-txt"> Delievered </p>
      </div>
      <div className="d-flex vl-edit-cal-info-sec align-items-center">
        <b className="calendar-circle mx-1 color-scheduled"></b>
        <p className="vl-info-txt"> Scheduled </p>
      </div>
      <div className="d-flex vl-edit-cal-info-sec align-items-center">
        <b className="calendar-circle mx-1 color-todays-date"></b>
        <p className="vl-info-txt"> Todays Date</p>
      </div>
    </Popover.Body>
  </Popover>
);

const CalendarLegend = () => {
  return (
    <span className="d-flex justify-content-between align-items-center">
      <OverlayTrigger trigger="focus" placement="left" key="calendar-overlay" overlay={popover}>
        <Button variant="transparent">
          <BsInfoCircle /> Example
        </Button>
      </OverlayTrigger>
    </span>
  );
};

export default CalendarLegend;
