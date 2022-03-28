
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
import { getPauseSubscriptionErrorData } from "./errorChecks";

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

  React.useEffect(() => {}, [selectedSubscriptionId]);

  useEffect(() => {
    dispatch(
      getOrders({ customer_number: userDetails.phone_number.substring(3) })
    );
  }, []);

  const onPauseMenuSelect = async (eventKey, subscriptionId) => {
    console.log("eventKey: "+ JSON.stringify(eventKey));
    console.log("subscriptionId: "+ JSON.stringify(subscriptionId));
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
    console.log(
      "pauseSubscriptionData: " + JSON.stringify(pauseSubscriptionData)
    );
    const { errorMessage } = getPauseSubscriptionErrorData(
      pauseSubscriptionData
    );
    console.log("errorMessage: "+ JSON.stringify(errorMessage))
    if (errorMessage !== "") {
      displayErrorModal(errorMessage);
    } else if (pauseSubscriptionData.check) {
      setShowConfirmationModal(true);
    } else {
      displayErrorModal("subscription paused");
    }
  };

  const onPause = (subscriptionId, comments, pauseDates) => {
    setShowPauseSubscriptionModal(false);
    setPauseSubscriptionData({
      subscriptionId, comments, pauseDates
    })
    dispatchToCallSubscriptionApi(true, subscriptionId, comments, pauseDates);
  };

  const displayErrorModal = (errorMessage) => {
    setShowErrorModal(true);
    SetErrorMessage(errorMessage);
  };

  const onPauseSubscriptionConfirmation = () => {
    const { subscriptionId, comments, pauseDates} = pauseSubscriptionData;
    setShowConfirmationModal(false);
    dispatchToCallSubscriptionApi(false, subscriptionId, comments, pauseDates);
  }

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
      /** Error Modal **/
      /** Confirmation Modal **/
      <Modal
        show={showConfirmationModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        primaryButtonClick={onPauseSubscriptionConfirmation}
        secondaryButtonClick={() => setShowErrorModal(false)}
        fullscreen={false}
        showImage={false}
        Body="Do you want to pause the subscription?"
      />
      /** Confirmation Modal **/
    </>
  );
};

export default Orders;
