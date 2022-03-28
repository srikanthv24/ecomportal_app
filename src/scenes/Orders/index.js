import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import { getSubscriptionDetails } from "../../services/api/getSubscriptionDetails";
import "./orders.scss";
import { cancelSubscriptionApi } from "../../services/api/cancelSubscription";
import PauseSubscriptionModal from "../../components/PauseSubscriptionModal/PauseSubscriptionModal";
import { pauseSubscriptionDetails } from "../../services/api/pauseSubscription";
import {
  getPauseSubscriptionErrorData,
  isPauseSubscription,
  getServicedDates,
} from "./utils";
import ConfirmationModalBody from "./ConfirmationModalBody";

const Orders = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const ordersList = useSelector((state) => state.Orders.ordersList);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [showPauseSubscriptionModal, setShowPauseSubscriptionModal] =
    useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState();
  const [selectedSubscriptionDetails, setSelectedSubscriptionDetails] =
    useState();
  const [serviceType, setServiceType] = useState("");
  const [showErrorModal, setShowErrorModal] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");
  const [pauseSubscriptionData, setPauseSubscriptionData] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [servicedData, setServicedData] = useState([]);

  React.useEffect(() => {}, [selectedSubscriptionId]);

  useEffect(() => {
    dispatch(
      getOrders({ customer_number: userDetails.phone_number.substring(3) })
    );
  }, []);

  const onPauseMenuSelect = async (eventKey, subscriptionId) => {
    console.log("eventKey: " + JSON.stringify(eventKey));
    console.log("subscriptionId: " + JSON.stringify(subscriptionId));
    setServiceType(eventKey);
    setSelectedSubscriptionId(subscriptionId);
    const { cart_id, cartitem_id, id } = ordersList.find((orderData) => {
      return orderData.id === subscriptionId;
    });
    const subscriptionDetails = await getSubscriptionDetails(
      cart_id,
      cartitem_id,
      id
    );
    setSelectedSubscriptionDetails(subscriptionDetails);
    setShowPauseSubscriptionModal(true);
  };

  const cancelSubscription = async () => {
    const cancelledSubscriptionId = await cancelSubscriptionApi(
      selectedSubscriptionId
    );
    setShowCancelSubscriptionModal(false);
    if (selectedSubscriptionId === cancelledSubscriptionId) {
      dispatch(
        getOrders({ customer_number: userDetails.phone_number.substring(3) })
      );
    }
  };

  const openCancelSubscriptionPopup = (id) => {
    setSelectedSubscriptionId(id);
    setShowCancelSubscriptionModal(true);
  };

  const dispatchToCallSubscriptionApi = async (
    isCheck,
    subscriptionId,
    comments,
    pauseDates
  ) => {
    const { data, errors } = await pauseSubscriptionDetails(
      isCheck,
      subscriptionId,
      comments,
      pauseDates
    );
    if (errors) {
      const { errorMessage } = getPauseSubscriptionErrorData(errors);
      displayErrorModal(errorMessage);
    } else {
      processPauseSubscriptionData(data.pauseSubscription);
    }
  };

  const processPauseSubscriptionData = (pauseSubscriptionData) => {
    const { errorMessage } = getPauseSubscriptionErrorData(
      pauseSubscriptionData
    );
    if (errorMessage !== "") {
      displayErrorModal(errorMessage);
    } else if (pauseSubscriptionData.check) {
      setShowConfirmationModal(true);
      setServicedData({
        fromDate: pauseSubscriptionData.pause_dates[0].from_date,
        toDate: pauseSubscriptionData.pause_dates[0].to_date,
        mealType: pauseSubscriptionData.product_name,
      });
    } else {
      dispatch(
        getOrders({ customer_number: userDetails.phone_number.substring(3) })
      );
      displayErrorModal("subscription paused");
    }
  };

  const onPause = (subscriptionId, comments, pauseDates) => {
    setShowPauseSubscriptionModal(false);
    setPauseSubscriptionData({
      subscriptionId,
      comments,
      pauseDates,
    });
    dispatchToCallSubscriptionApi(true, subscriptionId, comments, pauseDates);
  };

  const displayErrorModal = (errorMessage) => {
    setShowErrorModal(true);
    SetErrorMessage(errorMessage);
  };

  const onPauseSubscriptionConfirmation = () => {
    const { subscriptionId, comments, pauseDates } = pauseSubscriptionData;
    setShowConfirmationModal(false);
    dispatchToCallSubscriptionApi(false, subscriptionId, comments, pauseDates);
  };

  return (
    <>
      <OrderCard
        ordersList={ordersList}
        cancelSubscription={openCancelSubscriptionPopup}
        onPauseMenuSelect={onPauseMenuSelect}
      />
      {showPauseSubscriptionModal && (
        <PauseSubscriptionModal
          serviceType={serviceType}
          show={showPauseSubscriptionModal}
          subscriptionDetails={selectedSubscriptionDetails}
          onCancel={() => setShowPauseSubscriptionModal(false)}
          onSubmit={onPause}
          subscriptionId={selectedSubscriptionId}
        />
      )}
      /** Cancel Subscription Modal **/
      <Modal
        show={showCancelSubscriptionModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        secondaryButtonText="Return"
        primaryButtonClick={cancelSubscription}
        secondaryButtonClick={() => setShowCancelSubscriptionModal(false)}
        fullscreen={false}
        showImage={false}
        Body="Do you want to cancel the subscription? "
      />
      /** Error Modal **/
      <Modal
        show={showErrorModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        primaryButtonClick={() => setShowErrorModal(false)}
        fullscreen={false}
        showImage={false}
        Body={errorMessage}
      />
      /** Error Modal **/ /** Confirmation Modal **/
      <Modal
        show={showConfirmationModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        primaryButtonClick={onPauseSubscriptionConfirmation}
        secondaryButtonClick={() => setShowConfirmationModal(false)}
        fullscreen={false}
        showImage={false}
        Body={
          <div className="d-flex custom-info-block">
            <span className="desp-info pt-3 pb-1">
              {`Do you want to ${
                isPauseSubscription(serviceType) ? "pause" : "resume"
              } the subscription?`}
            </span>
            <div className="d-flex justify-content-start">
              <span className="desp-info">Meal Type:</span>
              <span className="px-4">
                <b>{servicedData.mealType}</b>
              </span>
            </div>
            <div className="d-flex justify-content-start my-2">
              <span className="d-inline-block pr-4">
                {isPauseSubscription(serviceType)
                  ? "Pause Dates:"
                  : "Resume Dates:"}
              </span>
              <span className="d-inline-block px-4">
                <b>{getServicedDates(servicedData, serviceType)}</b>
              </span>
            </div>
          </div>
        }
      />
      /** Confirmation Modal **/
    </>
  );
};

export default Orders;
