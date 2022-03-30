import React from "react";
import { isPauseSubscriptionService, getServicedDates } from "./utils";

const ConfirmationModalBody = React.memo(
  ({ serviceType, mealType, fromDate, toDate }) => {
    return (
      <div className="d-flex custom-info-block">
        <span className="desp-info pt-3 pb-1">
          {`Do you want to ${
            isPauseSubscriptionService(serviceType) ? "pause" : "resume"
          } the subscription?`}
        </span>
        <div className="d-flex justify-content-start">
          <span className="desp-info">Meal Type:</span>
          <span className="px-4">
            <b>{mealType}</b>
          </span>
        </div>
        <div className="d-flex justify-content-start my-2">
          <span className="d-inline-block pr-4">
            {isPauseSubscriptionService(serviceType)
              ? "Pause Dates:"
              : "Resume Dates:"}
          </span>
          <span className="d-inline-block px-4">
            <b>{getServicedDates(fromDate, toDate, serviceType)}</b>
          </span>
        </div>
      </div>
    );
  }
);

export default ConfirmationModalBody;
