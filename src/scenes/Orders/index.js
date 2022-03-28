import React, { useEffect, useState } from "react";
import ModalComponent from "../../components/Modal/modal";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import "./orders.scss";
import { cancelSubscriptionApi } from "../../services/api/cancelSubscription";

const Orders = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const OrdersList = useSelector((state) => state.Orders.ordersList);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState();

  const order_list = [
    {
      defaultimg_url:
        "https://portalimg.s3.amazonaws.com/products/image_cb5252ea-be8d-40ae-8b79-6f800c1dd05c_1024x1024@2x.jpg",
      item_name: "Pistachios 100g",
      tax_methods: "GST12OUTPUT",
      uom_name: "NOS",
      category: "Dried Fruits, Nuts & Seeds",
      item_id: "aa9726fd-f67b-47e7-956d-8af0217916bc",
      qty: 3,
      sale_val: 500,
      subscription: [],
      variants: [],
    },
  ];

  useEffect(() => {
    dispatch(
      getOrders({ customer_number: userDetails.phone_number.substring(3) })
    );
  }, []);

  const cancelSubscription = async() => {
    const cancelledSubscriptionId = await cancelSubscriptionApi(selectedSubscriptionId)
    setShowCancelSubscriptionModal(false);
    if(selectedSubscriptionId === cancelledSubscriptionId){
      
      dispatch(
        getOrders({ customer_number: userDetails.phone_number.substring(3) })
      );
    } 
  }

  const openCancelSubscriptionPopup = (id) => {
    setSelectedSubscriptionId(id);
    setShowCancelSubscriptionModal(true);
  }


  return (
    <>
    <OrderCard ordersList={OrdersList} cancelSubscription={openCancelSubscriptionPopup}/>

    <ModalComponent
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
</>
  );
};

export default Orders;
