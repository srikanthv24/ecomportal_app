import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import { getSubscriptionDetails } from "../../services/api/getSubscriptionDetails";
import "./orders.scss";
import { cancelSubscriptionApi } from "../../services/api/cancelSubscription";
import SubscriptionModal from "../../components/SubscriptionModal/SubscriptionModal";
import { pauseSubscription } from "../../services/api/pauseSubscription";
import { getSubscriptionErrorData, isPauseSubscriptionService } from "./utils";
import ConfirmationModalBody from "./ConfirmationModalBody";
import { getMinDate, getMaxDate } from "../../utils/dateUtils";
import { resumeSubscription } from "../../services/api/resumeSubscription";

const Orders = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const ordersList = useSelector((state) => state.Orders.ordersList);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
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

  const onMenuSelect = async (eventKey, subscriptionId) => {
    setServiceType(eventKey);
    setSelectedSubscriptionId(subscriptionId);
    const { cart_id, cartitem_id, id } = ordersList.find((orderData) => {
      return orderData.id === subscriptionId;
    });
    const { subscriptionDetails, error } = await getSubscriptionDetails(
      cart_id,
      cartitem_id,
      id
    );
    if (error) {
      displayErrorModal(error.message);
    } else {
      setSelectedSubscriptionDetails(subscriptionDetails);
      setShowSubscriptionModal(true);
    }
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
    dates
  ) => {
    const { data, errors } = isPauseSubscriptionService(serviceType)
      ? await pauseSubscription(isCheck, subscriptionId, comments, dates)
      : await resumeSubscription(isCheck, subscriptionId);
    if (errors) {
      const { errorMessage } = getSubscriptionErrorData(errors);
      displayErrorModal(errorMessage);
    } else {
      processSubscriptionData(data.pauseSubscription);
    }
  };

  const processSubscriptionData = (pauseSubscriptionData) => {
    const { errorMessage } = getSubscriptionErrorData(pauseSubscriptionData);
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

  const onSubscriptionSubmit = (subscriptionId, comments, dates) => {
    setShowSubscriptionModal(false);
    setPauseSubscriptionData({
      subscriptionId,
      comments,
      dates,
    });
    dispatchToCallSubscriptionApi(true, subscriptionId, comments, dates);
  };

  const displayErrorModal = (errorMessage) => {
    setShowErrorModal(true);
    SetErrorMessage(errorMessage);
  };

  const onSubscriptionConfirmation = () => {
    const { subscriptionId, comments, dates } = pauseSubscriptionData;
    setShowConfirmationModal(false);
    dispatchToCallSubscriptionApi(false, subscriptionId, comments, dates);
  };

  return (
    <>
      <OrderCard
        ordersList={ordersList}
        cancelSubscription={openCancelSubscriptionPopup}
        onMenuSelect={onMenuSelect}
      />
      {showSubscriptionModal && (
        <SubscriptionModal
          serviceType={serviceType}
          show={showSubscriptionModal}
          onCancel={() => setShowSubscriptionModal(false)}
          onSubmit={onSubscriptionSubmit}
          subscriptionId={selectedSubscriptionId}
          maxDate={getMaxDate(selectedSubscriptionDetails.item.subscription)}
          minDate={getMinDate(selectedSubscriptionDetails.item.subscription)}
          sessionCodes={selectedSubscriptionDetails.item.subscription.map(
            (subscription) => subscription.meal_type
          )}
        />
      )}
      {/** Cancel Subscription Modal **/}
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
      {/** Error Modal **/}
      <Modal
        show={showErrorModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        primaryButtonClick={() => setShowErrorModal(false)}
        fullscreen={false}
        showImage={false}
        Body={errorMessage}
      />
      {/** Error Modal **/
      /** Confirmation Modal **/}
      <Modal
        show={showConfirmationModal}
        showModalHeader={false}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        primaryButtonClick={onSubscriptionConfirmation}
        secondaryButtonClick={() => setShowConfirmationModal(false)}
        fullscreen={false}
        showImage={false}
        Body={
          <ConfirmationModalBody
            fromDate={servicedData.fromDate}
            toDate={servicedData.toDate}
            mealType={servicedData.mealType}
            servicedData={servicedData}
            serviceType={serviceType}
          />
        }
      ></Modal>
      {/** Confirmation Modal **/}
    </>
  );
};

export default Orders;
