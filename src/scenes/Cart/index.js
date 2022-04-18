import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "underscore";
import ModalComponent from "../../components/Modal/Modal";
import { getOrders } from "../../store/actions/orders";
import {
  getCart,
  hideAlert,
  showAlert,
  updateCartQty,
} from "../../store/actions";
import CartItem from "../../components/CartItem/CartItem";
import { CART, PICKUP } from "../../utils/constants";
import OrderCheckList from "./order-checklist";
import { deleteCartItem } from "../../store/actions/cart-item";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import api_urls from "../../utils/UrlConfig";

const CartSummary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    sub: customerId,
    name: customerName,
    phone_number: customerMobileNumber,
  } = useSelector((state) => state.auth.userDetails);
  const { cartDetails, cartLoading, cartUpdateLoading, cartCreated } =
    useSelector((state) => state.Cart);
  const {
    showAlert: alert,
    variant,
    alertMessage,
  } = useSelector((state) => state.AlertReducer);
  const [items, setItems] = useState([]);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    if (cartDetails?.items && cartDetails.items?.length) {
      let temp = [];
      cartDetails.items.map((item, index) => {
        let obj = {
          ciid: item.ciid,
          sub_total: item.item.sub_total,
        };
        temp.push(obj);
      });
      setItems(temp);
    }
  }, [cartDetails?.items]);

  useEffect(() => {
    if (customerId) {
      dispatch(getCart({ customer_id: customerId }));
    }
  }, [cartCreated]);

  const onDeleteCartItem = (productIndex) => {
    dispatch(
      deleteCartItem({
        cart_item_id: cartDetails?.items[productIndex].ciid,
        id: cartDetails?.items[productIndex]?.id,
        customer_id: customerId,
      })
    );
  };

  const onCartItemIncrement = (productIndex, itemId, quantity) => {
    dispatch(
      updateCartQty({
        cart_item_id: cartDetails.items[productIndex].ciid,
        id: cartDetails.items[productIndex].id,
        customer_id: customerId,
        item_id: itemId,
        qty: quantity + 1,
      })
    );
  };

  const onCartItemDecrement = (productIndex, itemId, quantity) => {
    if (quantity == 1) {
      onDeleteCartItem(productIndex);
    } else {
      dispatch(
        updateCartQty({
          cart_item_id: cartDetails.items[productIndex].ciid,
          id: cartDetails.items[productIndex].id,
          customer_id: customerId,
          item_id: itemId,
          qty: quantity - 1,
        })
      );
    }
  };

  const onGoToOrdersClick = () => {
    dispatch(hideAlert());
    dispatch(getCart({ customer_id: customerId }));
    dispatch(
      getOrders({ customer_number: userDetails.phone_number.substring(3) })
    );
    history.push("/orders");
  };

  return (
    <>
      <ModalComponent
        show={alert}
        type={variant}
        Body={alertMessage.body}
        Title={alertMessage.title}
        handleClose={() => dispatch(hideAlert())}
        footer={
          <div>
            <Button onClick={onGoToOrdersClick}>{CART.GO_TO_ORDERS}</Button>
          </div>
        }
      />
      <div className="cart-summary-wrapper">
        <p className="h3 page-title">{CART.CART_TITLE}</p>
        <div className="d-flex align-items-center w-100p">
          {!cartLoading &&
            !cartUpdateLoading &&
            cartDetails &&
            cartDetails.items?.length > 0 && (
              <p className="cart-list-product-detailes-despname mb-0">
                {`${CART.TOTAL} ${cartDetails?.items?.length || 0} ${
                  CART.ITEMS_IN_CART
                }`}
              </p>
            )}
        </div>
        {cartLoading || cartUpdateLoading ? (
          <div className="fullscreen-loader">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <>
            {cartDetails?.items?.map((product, index) => {
              const isMealItem =
                product?.item?.subscription?.length > 0 ? true : false;
              const deliveryStatus =
                product?.item?.subscription &&
                product?.item?.subscription[0]?.isDelivery;

              const planDuration = product?.item?.variants?.map((item) =>
                item.display_name === CART.DURATION
                  ? item.items[0].display_name
                  : 0
              );
              let address = "";
              const selectedSessions = [];
              product?.item?.subscription?.map((item, itemIndex) => {
                selectedSessions.push(item.meal_type);
                if (itemIndex === 0) {
                  address = item.isDelivery
                    ? `#${item.address.aline1}, ${item.address.aline2}, ${item.address.landmark}, ${item.address.city} ${item.address.postalcode}`
                    : PICKUP;
                }
              });

              return (
                <CartItem
                  key={product.ciid}
                  product={product.item}
                  isMealItem={isMealItem}
                  productIndex={index}
                  duration={planDuration}
                  isDelivery={deliveryStatus}
                  address={address}
                  itemGrandTotal={product?.grand_total}
                  selectedSessions={selectedSessions}
                  loading={cartLoading}
                  onQtyIncrement={onCartItemIncrement}
                  onQtyDecrement={onCartItemDecrement}
                  onDelete={onDeleteCartItem}
                />
              );
            })}
            {cartDetails?.items?.length > 0 && (
              <>
                <OrderCheckList
                  subTotal={cartDetails?.items_value}
                  taxes={cartDetails?.total_tax}
                  deliveryCharges={cartDetails?.total_deliverycharge}
                  discount={cartDetails?.total_discount}
                  grandTotal={cartDetails?.grand_total}
                />
                <div className="confirm-button-container">
                  <Button
                    className="vl-custom-btn abcd"
                    onClick={handleContinue}
                  >
                    {CART.CONFIRM_AND_PAY}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        {(_.isEmpty(cartDetails) || _.isEmpty(cartDetails.items)) &&
        !cartLoading &&
        !cartUpdateLoading ? (
          <EmptyCart />
        ) : (
          <></>
        )}
      </div>
    </>
  );

  // This block of code will be moved - start

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handleContinue() {
    const res = await loadScript(`${api_urls.Razorpay_API_URL}`);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const req = {
      type: "createorder",
      items: items,
      amount: Number(
        parseInt(parseFloat(cartDetails?.grand_total).toFixed(2)) * 100
      ),
      currency: "INR",
      receipt: "Receipt #20",
      id: cartDetails?.items[0].id,
      customer_id: customerId,
      phone: customerMobileNumber.substring(3),
    };

    const result = await fetch(`${api_urls.Payment_API_URL}`, {
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res.json());

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;
    const options = {
      key: `${api_urls.payment_key}`, // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: customerName,
      order_id: order_id,
      upi_link: true,
      handler: async function (response) {
        dispatch(getCart({ customer_id: customerId }));
        dispatch(
          showAlert({
            message: (
              <div>
                Transaction ID: <br />
                <b>{response.razorpay_payment_id}</b>
              </div>
            ),
            variant: "success",
            title: "Payment Success",
          })
        );
      },
      prefill: {
        name: customerName,
        contact: customerMobileNumber.substring(3),
      },
      notes: {
        address: "VL",
      },
      theme: {
        color: "#f05922",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) =>
      console.log("FailedResponse", response)
    );
    paymentObject.open();
  }

  // This block of code will be moved - end
};

export default CartSummary;
