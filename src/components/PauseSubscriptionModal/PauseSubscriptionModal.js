import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import SessionCordinator from "../SessionCordinator";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { Modal } from "react-bootstrap";
import { SERVICE_TYPE, SERVICE_LABELS } from "../../utils/constants";
import { getMinDateAsToday } from "../../utils/dateUtils";
import SubscriptionButtonGroup from "./SubscriptionButtonGroup";
import SubscriptionTitle from "./SubscriptionTitle";
import moment from "moment";
import SubscriptionComments from "./SubscriptionComments";
import "./styles.css";

const PauseSubscriptionModal = ({
  serviceType,
  onCancel,
  onSubmit,
  show,
  subscriptionDetails,
  subscriptionId,
}) => {
  const sessionCodes = subscriptionDetails.item.subscription.map(
    (subscription) => subscription.meal_type
  );
  const [selectedSessionCodes, setSelectedSessionCodes] = useState([]);
  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [comments, setComments] = useState("");
  const onPause = () => {
    const pauseDates = selectedSessionCodes.map((code) => {
      return {
        custom_dates: [],
        from_date: getFromDate(),
        to_date: getToDate(),
        session: code,
      };
    });
    const tomorrowDate = moment().add(1, "days").format("YYYY-MM-DD");

    onSubmit(subscriptionId, comments, pauseDates);
  };
  const onSessionChange = (selectedSessions) =>
    setSelectedSessionCodes(selectedSessions);

  const getToDate = () => {
    if (serviceType === SERVICE_TYPE.PAUSE_INDEFINITE) {
      return null;
    } else if (serviceType === SERVICE_TYPE.PAUSE_TOMORROW) {
      moment().add(1, "days").format("YYYY-MM-DD");
    } else if (serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN) {
      return toDate;
    }
  };
  const getFromDate = () => {
    if (serviceType === SERVICE_TYPE.PAUSE_TOMORROW) {
      return moment().add(1, "days").format("YYYY-MM-DD");
    } else if (
      serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
      serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN
    ) {
      return toDate;
    }
  };

  return (
    <Modal show={show}>
      <section className="order-modal-content">
        <SubscriptionTitle text={SERVICE_LABELS[serviceType]} />
        <Modal.Body>
          <section className="modal-body-content">
            {serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
            serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
            serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
            serviceType === SERVICE_TYPE.RESUME_INDEFINITE ? (
              <>
                {(serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
                  serviceType === SERVICE_TYPE.PAUSE_INDEFINITE) && (
                  <div className="order-form-control">
                    <span className="date-info">From Date:</span>
                    <DatePicker
                      name="from_date"
                      className="order-form-control-input"
                      minDate={getMinDateAsToday}
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
                      minDate={getMinDateAsToday}
                      value={toDate}
                      onChange={(date) => setToDate(date.format("YYYY-MM-DD"))}
                    />
                  </div>
                )}
                <SessionCordinator
                  sessionCodes={sessionCodes}
                  onSessionChange={onSessionChange}
                />
                <SubscriptionComments
                  onCommentsChange={(e) => setComments(e.target.value)}
                />
                <SubscriptionButtonGroup
                  onCancel={onCancel}
                  onSubmit={onPause}
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
};

export default PauseSubscriptionModal;
