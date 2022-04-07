import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ModalComponent from "../../components/Modal/Modal";
import { getCart, hideAlert, updateCartQty } from "../../store/actions";
import CartItem from "../../components/CartItem/CartItem";
import { CART } from "../../utils/constants";
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
  const { showAlert, variant, alertMessage } = useSelector(
    (state) => state.AlertReducer
  );
  const [items, setItems] = useState([]);

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

  console.log("cartDetails", cartDetails);

  return (
    <>
    <ModalComponent
        show={showAlert}
        type={variant}
        Body={alertMessage.body}
        Title={alertMessage.title}
        handleClose={() => dispatch(hideAlert())}
        footer={
          <div>
            <Button
              onClick={() => {
                dispatch(hideAlert());
                dispatch(getCart({ customer_id: customerId }));
                history.push("/orders");
              }}
            >
              Go to Orders
            </Button>
          </div>
        }
      />
    <div className="p-21 bg-1 cart-summary-wrapper">
      <p className="h3 page-title">{CART.CART_TITLE}</p>
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

            const planDuration = product?.item?.variants?.map((item) => {
              if (item.display_name === "Duration") {
                return item.items[0].display_name;
              } else {
                return 0;
              }
            });

            const address = product?.item?.subscription?.map((item) =>
              item.isDelivery
                ? `${item.address.tag}: ${item.address.aline1}, ${item.address.aline2}, ${item.address.landmark}, ${item.address.city} ${item.address.postalcode}`
                : "Pickup"
            );
            const selectedSessions = product?.item?.subscription?.map(
              (item) => item.meal_type
            );

            return (
              <CartItem
                key={product.ciid}
                isMealItem={isMealItem}
                imgUrl={product.item.defaultimg_url}
                productName={product.item.item_name}
                quantity={product.item.qty}
                productIndex={index}
                duration={planDuration}
                isDelivery={deliveryStatus}
                address={address}
                itemPrice={product?.item?.sub_total}
                itemTax={product?.item?.tax_amount}
                itemDeliveryCharge={product?.item?.delivery_charge}
                itemDiscount={product?.item?.discount_amount}
                itemGrandTotal={product?.item?.sub_total}
                selectedSessions={selectedSessions}
                loading={cartLoading}
                onQtyIncrement={onCartItemIncrement}
                onQtyDecrement={onCartItemDecrement}
                onDelete={onDeleteCartItem}
              />
            );
          })}
          {cartDetails && cartDetails?.items?.length > 0 && (
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
                  className="w-100 custom-primary-btn "
                  style={{ boxShadow: "1px 2px 3px #ededed", padding: 5 }}
                  onClick={handleContinue}
                >
                  Confirm and Pay
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {cartDetails &&
      !cartLoading &&
      !cartUpdateLoading &&
      cartDetails?.items?.length === 0 ? (
        <EmptyCart />
      ) : null}
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
      amount: Number(parseInt(parseFloat(cartDetails?.grand_total).toFixed(2)) * 100),
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
        // console.log("response", response);
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
