import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import _ from "underscore";
import { getSubscriptionDetails, updateSubscriptionDetails } from "../../store/actions";
import { UPDATE_ORDER , PICKUP, DELIVERY} from "../../utils/constants";
import ProductPlanner from "./ProductPlanner";
import "./styles.scss";

const UpdateOrder = () => {
  const {cid, ciid, sid} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscriptions.subscription);
  const loading = useSelector((state) => state.subscriptions.loading);
  const {sub: customerId, name, phone_number} = useSelector((state) => state?.auth?.userDetails);
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
  const [newDates, setNewDates] = useState([]);

  const [item, setItem] = useState({
    name: "",
    category: "",
    image: "",
    description: ""
  });
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dispatch(getSubscriptionDetails({cid, ciid, sid}));
    setInputs((inputs) => ({
      ...inputs, 
      profileDetails: {
        gender: "",
        heightFeet: null,
        heightInch: null,
        weight: null,
        age: null,
      }
    }));
  }, []);

  useEffect(() => {
    customerId !== "" && setInputs((inputs) => ({...inputs, customerId, name, phone_number})); 
  }, [customerId]);

  useEffect(() => {
    if(!_.isEmpty(subscription)) {
      let selectedSessions = [];
      const orderDates = subscription.item.subscription.map((sub) => {
        const newDate = sub.order_dates.map((dt) => dt.date);
        selectedSessions.push(sub.meal_type);
        return newDate;
      })
      setInputs((inputs) => ({
        ...inputs, 
        deliveryType: subscription.item.subscription[0].isDelivery ? DELIVERY : PICKUP,
        orderDate: orderDates,
        variants: subscription.item.variants,
        productId: subscription.item.item_id,
        selectedSessions: selectedSessions,
        address: subscription.item.subscription[0].isDelivery ? subscription.item.subscription[0].address : {}
      }));
      setItem((item) => ({
        ...item,
        name: subscription.item.item_name,
        category: subscription.item.category,
        image: subscription.item.defaultimg_url
      }))
    }
  }, [subscription]);

  const onUpdateCart = async () => {
    let updatedObject = { ...inputs };
    updatedObject.orderDate = newDates;
    await dispatch(updateSubscriptionDetails(updatedObject));
    history.push('/orders');
  }

  return(
    <section className="planner-container">
      <div className="text-center pb-3 updateOrder-sec">
        {
          loading ?
          <div className="fullscreen-loader">
            <Spinner animation="border" role="status" />
          </div>
          :
          <>
            <ProductPlanner
              productTitle={item.name}
              productCategory={item.category}
              imageUrl={item.image}
              productDescription={item.description}
              inputs={inputs}
              setInputs={setInputs}
              setDisable={setDisable}
              setNewDates={setNewDates}
            />
            <Button
             className="mt-3 mx-auto vl-custom-btn"
              onClick={onUpdateCart}
              disabled={disable}
            >
              {UPDATE_ORDER}
            </Button>
          </>
        }
      </div>
    </section>
  );

}

export default UpdateOrder;