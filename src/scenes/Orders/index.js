import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import { setSubscriptionDetails } from "../../store/actions/subscription";
import { getSubscriptionDetails } from "../../services/api/getSubscriptionDetails";
import "./orders.scss";
import { cancelSubscriptionApi } from "../../services/api/cancelSubscription";
import SubscriptionModal from "../../components/SubscriptionModal/SubscriptionModal";
import { pauseSubscription } from "../../services/api/pauseSubscription";
import { getSubscriptionErrorData, isPauseSubscriptionService } from "./utils";
import ConfirmationModalBody from "./ConfirmationModalBody";
import { getMinDate, getMaxDate } from "../../utils/dateUtils";
import { resumeSubscription } from "../../services/api/resumeSubscription";
import { SERVICE_TYPE } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const isLoading = useSelector((state) => state.Orders.isLoading);
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
  const [productName, setProductName] = useState();

  React.useEffect(() => {}, [selectedSubscriptionId]);


  const onMenuSelect = async (eventKey, subscriptionId) => {
    setServiceType(eventKey);
    setSelectedSubscriptionId(subscriptionId);
    const { cart_id, cartitem_id, id, product } = ordersList.find(
      (orderData) => {
        return orderData.id === subscriptionId;
      }
    );
    const { subscriptionDetails, error } = await getSubscriptionDetails(
      cart_id,
      cartitem_id,
      id
    );
    setProductName(product.display_name);
    if (error) {
      displayErrorModal(error.message);
    } else {
      dispatch(setSubscriptionDetails(subscriptionDetails));
      if (eventKey === SERVICE_TYPE.EDIT_SUBSCRIPTION) {
        const link = `/order/${subscriptionDetails.id}/${subscriptionDetails.ciid}/${subscriptionDetails.subscription_id}`
        history.push(link);
      }
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
      const { pauseSubscription, resumeSubscription } = data;
      pauseSubscription && processPauseSubscriptionData(pauseSubscription);
      resumeSubscription && processResumeSubscriptionData(resumeSubscription);
    }
  };

  const processPauseSubscriptionData = (pauseSubscriptionData) => {
    const { errorMessage } = getSubscriptionErrorData(pauseSubscriptionData);
    const { check, pause_dates, product_name } = pauseSubscriptionData;
    if (errorMessage !== "") {
      displayErrorModal(errorMessage);
    } else if (check) {
      setShowConfirmationModal(true);
      setServicedData({
        fromDate: pause_dates[0].from_date,
        toDate: pause_dates[0].to_date,
        mealType: product_name,
      });
    } else {
      dispatch(
        getOrders({ customer_number: userDetails.phone_number.substring(3) })
      );
      displayErrorModal("subscription paused");
    }
  };

  const processResumeSubscriptionData = (resumeSubscriptionData) => {
    const { errorMessage } = getSubscriptionErrorData(resumeSubscriptionData);
    if (errorMessage !== "") {
      displayErrorModal(errorMessage);
    } else {
      displayErrorModal("subscription resumed"); // To be Developed
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

  return !isLoading ? (
    <>
      <OrderCard
        ordersList={ordersList}
        cancelSubscription={openCancelSubscriptionPopup}
        onMenuSelect={onMenuSelect}
      />
      {showSubscriptionModal && (
        <SubscriptionModal
          productName={productName}
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
  ) : (
    <Spinner className="meal-spinner" animation="border" />
  );
};

export default Orders;
