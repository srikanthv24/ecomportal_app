import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import "./calendarLegend.scss";

const popover = (
  <Popover id="calendar-overlay">
    <Popover.Header as="h3">Legend</Popover.Header>
    <Popover.Body>
      <div className="d-flex">
        <b className="calendar-circle mx-1 color-delievered"></b>
        <p> Delievered </p>
      </div>
      <div className="d-flex">
        <b className="calendar-circle mx-1 color-scheduled"></b>
        <p> Scheduled </p>
      </div>
      <div className="d-flex">
        <b className="calendar-circle mx-1 color-todays-date"></b>
        <p>Todays Date</p>
      </div>
    </Popover.Body>
  </Popover>
);

const CalendarLegend = () => {
  return (
    <span className="d-flex justify-content-between align-items-center">
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="transparent">
          <BsInfoCircle />
        </Button>
      </OverlayTrigger>
    </span>
  );
};

export default CalendarLegend;
