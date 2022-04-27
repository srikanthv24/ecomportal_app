import React from "react";
import { getDateInTextFormat } from "../../utils/dateUtils";

export const PlanDetails = ({ duration, subscriptionStartDate }) => {
  return (
    <div className="vl-edit-prd-planner-sec">
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
    </div>
  );
};
