import React, { useEffect, useState } from "react";
import SessionCordinator from "../SessionCordinator";
import DatePicker from "react-multi-date-picker";
import { Modal } from "react-bootstrap";
import { SERVICE_TYPE, SERVICE_LABELS } from "../../utils/constants";
import SubscriptionButtonGroup from "./SubscriptionButtonGroup";
import SubscriptionTitle from "./SubscriptionTitle";
import moment from "moment";
import SubscriptionComments from "./SubscriptionComments";
import "./styles.css";
import {
  isPauseSubscriptionService,
  getSubscriptionConfirmationText,
} from "../../utils/subscriptionUtils";

const SubscriptionModal = React.memo(
  ({
    serviceType,
    onCancel,
    onSubmit,
    show,
    subscriptionId,
    maxDate,
    minDate,
    sessionCodes,
    productName,
  }) => {
    const [selectedSessionCodes, setSelectedSessionCodes] = useState(sessionCodes);
    const [fromDate, setFromDate] = useState(minDate);
    const [toDate, setToDate] = useState(minDate);
    const [comments, setComments] = useState("");
    const setDatesAndSubmit = () => {
      if (selectedSessionCodes.length === 0) return;
      const dates = selectedSessionCodes.map((code) => {
        return {
          custom_dates: [],
          from_date: getFromDate(),
          to_date: getToDate(),
          session: code,
        };
      });
      onSubmit(subscriptionId, comments, dates);
    };
    const onSessionChange = (selectedSessions) =>
      setSelectedSessionCodes(selectedSessions);

    const getToDate = () => {
      if (serviceType === SERVICE_TYPE.PAUSE_INDEFINITE) {
        return maxDate;
      } else if (serviceType === SERVICE_TYPE.PAUSE_TOMORROW) {
        return moment().add(1, "days").format("YYYY-MM-DD");
      } else if (serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN) {
        return toDate;
      }
    };
    const getFromDate = () => {
      const tomorrowDate = moment().add(1, "days").format("YYYY-MM-DD");
      if (serviceType === SERVICE_TYPE.PAUSE_INDEFINITE) {
        return moment(tomorrowDate).isAfter(minDate) ? tomorrowDate : minDate;
      } else if (serviceType === SERVICE_TYPE.PAUSE_TOMORROW) {
        return moment().add(1, "days").format("YYYY-MM-DD");
      } else if (serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN) {
        return fromDate;
      }
    };

    
    return (
      <Modal show={show} centered>
        <section className="order-modal-content">
          <SubscriptionTitle text={SERVICE_LABELS[serviceType]} />
          <Modal.Body>
            <section className="modal-body-content product-planner subs-modal-content">
              {serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
              serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
              serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
              serviceType === SERVICE_TYPE.RESUME_INDEFINITE ? (
                <>
                  <div className="subscription-description">
                    {getSubscriptionConfirmationText(serviceType, productName)}
                  </div>
                  {serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN && (
                    <div className="order-form-control">
                      <span className="date-info">From Date:</span>
                      <DatePicker
                        name="from_date"
                        className="order-form-control-input"
                        minDate={minDate}
                        maxDate={maxDate}
                        value={fromDate}
                        onChange={(date) =>
                          setFromDate(date.format("YYYY-MM-DD"))
                        }
                      />
                    </div>
                  )}
                  {serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN && (
                    <div className="order-form-control">
                      <span className="date-info">To Date:</span>
                      <DatePicker
                        name="to_date"
                        className="order-form-control-input"
                        minDate={minDate}
                        maxDate={maxDate}
                        value={toDate}
                        onChange={(date) =>
                          setToDate(date.format("YYYY-MM-DD"))
                        }
                      />
                    </div>
                  )}
                  <SessionCordinator
                    sessionCodes={sessionCodes}
                    onSessionChange={onSessionChange}
                    disabled={true}
                    selectedSessions={sessionCodes}
                  />
                  <SubscriptionComments
                    onCommentsChange={(e) => setComments(e.target.value)}
                  />
                  <SubscriptionButtonGroup
                    onCancel={onCancel}
                    onSubmit={setDatesAndSubmit}
                    isPrimaryButtonDisabled={
                      selectedSessionCodes.length > 0 ? false : true
                    }
                    primaryButtonText={
                      isPauseSubscriptionService(serviceType)
                        ? "Pause"
                        : "Resume"
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </section>
          </Modal.Body>
        </section>
      </Modal>
    );
  }
);

export default SubscriptionModal;
