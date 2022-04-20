import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import _ from "underscore";
import {
  getSubscriptionDetails,
  updateSubscriptionDetails,
} from "../../store/actions";
import { UPDATE_ORDER, PICKUP, DELIVERY } from "../../utils/constants";
import EditSubscription from "./EditSubscription";
import "./styles.scss";
import { getDataForUpdateCartApi } from "./updateOrder.utils";

const UpdateOrder = () => {
  const { cid, ciid, sid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscriptions.subscription);
  const SubscriptionData = subscription?.item?.subscription;
  const loading = useSelector((state) => state.subscriptions.loading);
  const userDetails = useSelector((state) => state?.auth?.userDetails);
  const subscriptionList = useSelector((state) => state.Orders.ordersList);
  const [inputs, setInputs] = useState({
    profileDetails: {},
    deliveryType: "",
    orderDate: [],
    variants: [],
    customerId: "",
    name: "",
    phone_number: "",
    productId: "",
    product_name: "",
    subscription_id: sid,
    id: cid,
    ciid: ciid,
    selectedSessions: [],
    address: {},
  });

  const [item, setItem] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
  });
  const [disable, setDisable] = useState(false);

  const orderDates = SubscriptionData?.map((sessionData) => {
    return sessionData.order_dates;
  });
  /*** As of now duration would be same for all sessions ****/
  const mealDisplayName =
    subscription?.item?.variants[0]?.items[0].display_name;
  const duration = mealDisplayName?.replace(/[^\d]/g, "");
  const deliveryType = SubscriptionData?.isDelivery ? DELIVERY : PICKUP;
  const selectedSessions = SubscriptionData?.map((sessionData) => {
    return sessionData.meal_type;
  });
  const subscriptionStartDate = subscriptionList.find(
    (eachSubscription) => eachSubscription.id === subscription.subscription_id
  );
  const [newDates, setNewDates] = useState([]);

  useEffect(() => {
    dispatch(getSubscriptionDetails({ cid, ciid, sid }));
    setInputs((inputs) => ({
      ...inputs,
      profileDetails: {
        gender: "",
        heightFeet: null,
        heightInch: null,
        weight: null,
        age: null,
      },
    }));
  }, []);

  const onUpdateCart = async () => {
    const updatedDates = SubscriptionData.map((sessionData, index) => {
      if (newDates[index]) {
        return newDates[index];
      } else {
        return sessionData.order_dates.map(
          (orderDatesWithStatus) => orderDatesWithStatus.date
        );
      }
    });
    const requestData = getDataForUpdateCartApi(
      updatedDates,
      userDetails,
      subscription,
      selectedSessions,
      duration
    );
    await dispatch(updateSubscriptionDetails(requestData));
    history.push("/orders");
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history.push("/orders");
  };

  const handleCalendarChange = (newSessionDates, sessionIndex) => {
    const updatedDates = [];
    updatedDates[sessionIndex] = newSessionDates;
    setNewDates(updatedDates);
  };

  return (
    <section className="planner-container">
      <div className="text-center pb-3 updateOrder-sec">
        {loading ? (
          <div className="fullscreen-loader">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <>
            <EditSubscription
              productTitle={item.name}
              productCategory={item.category}
              imageUrl={item.image}
              productDescription={item.description}
              inputs={inputs}
              setInputs={setInputs}
              setDisable={setDisable}
              handleCalendarChange={handleCalendarChange}
              orderDates={orderDates}
              duration={duration}
              deliveryType={deliveryType}
              selectedSessions={selectedSessions}
              mealDisplayName={mealDisplayName}
              subscriptionStartDate={subscriptionStartDate}
              grace={7}
            />
            <div className="d-flex mx-auto btn-group mt-3 vl-action-btn">
              <button
                type="button"
                className="btn w-50p vl-go-back-btn"
                onClick={handleGoBack}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn w-50p vl-go-next-btn"
                disabled={disable}
                onClick={onUpdateCart}
              >
                {UPDATE_ORDER}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpdateOrder;
