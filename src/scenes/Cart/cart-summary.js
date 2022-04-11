/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getAddresses,
  getCartSummary,
  getCart,
  hideAlert,
  showAlert,
} from "../../store/actions";
import ModalComponent from "../../components/Modal/Modal";
import { OrderCheckList } from "./order-checklist";
import CartSummaryItem from "./cart-summary-item";
import { displayCurrency } from "../../helpers/displayCurrency";
import api_urls from "../../utils/UrlConfig";
const CartSummary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const AlertReducer = useSelector((state) => state.AlertReducer);
  const { cartDetails, cartLoading, cartUpdateLoading, cartCreated, cartItemsLoading } =
    useSelector((state) => state.Cart);
  const [items, setItems] = useState([]);

  /*useEffect(() => {
    if (userDetails.sub) {
      dispatch(getAddresses({ customerId: userDetails.sub }));
      dispatch(getCart({ customer_id: userDetails.sub }));
    }
  }, [cartCreated]);*/

  useEffect(() => {
    let temp = [];
    if (Addresses.listAddresses) {
      const items = Addresses.listAddresses.items;
      items.map((address) => {
        let label =
          address.aline1 +
          ", " +
          address.aline2 +
          ", " +
          address.city +
          ", " +
          address.state +
          ", " +
          address.postalcode;
        temp.push({ ...address, label: label, value: address.id });
      });
    }
  }, [Addresses.listAddresses]);

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
  return ( !cartLoading)? (
    <div>
      <ModalComponent
        show={AlertReducer.showAlert}
        type={AlertReducer.variant}
        Body={AlertReducer.alertMessage.body}
        Title={AlertReducer.alertMessage.title}
        handleClose={() => dispatch(hideAlert())}
        footer={
          <div>
            <Button
              onClick={() => {
                dispatch(hideAlert());
                dispatch(getCart({ customer_id: userDetails.sub }));
                history.push("/orders");
              }}
            >
              Go to Orders
            </Button>
          </div>
        }
      />
      <div className="p-21 bg-1 cart-summary-wrapper">
        <p className="h3 page-title">Cart Summary</p>
        <div className="d-flex align-items-center w-100p">
          {!cartLoading &&
            !cartUpdateLoading &&
            cartDetails &&
            cartDetails.items?.length > 0 && (
              <p className="cart-summary-desc-item-container mb-0">
                Items <strong>{cartDetails?.items?.length || 0}</strong>
              </p>
            )}
        </div>

        <section className="cart-items-block">
          {cartLoading || cartUpdateLoading ? (
            <div className="fullscreen-loader">
              <Spinner animation="border" role="status" />
            </div>
          ) : null}
          {!cartLoading &&
            !cartUpdateLoading &&
            cartDetails &&
            cartDetails.items?.length > 0 && (
              <>
                {cartDetails?.items?.map((item, index) => {
                  return (
                    <CartSummaryItem
                      ProductDetails={item.item}
                      pindex={index}
                    />
                  );
                })}
                <OrderCheckList
                  grandTotal={cartDetails?.grand_total}
                  taxes={cartDetails?.total_tax}
                  discount={cartDetails?.total_discount}
                  deliveryCharges={cartDetails?.total_deliverycharge}
                />
                <div className="confirm-button-container">
                  <Button
                    className="w-100 custom-primary-btn "
                    style={{ boxShadow: "1px 2px 3px #ededed", padding: 5 }}
                    onClick={handleContinue}
                    disabled={
                      cartDetails?.items?.length === 0 ||
                      cartLoading ||
                      cartUpdateLoading
                        ? true
                        : false
                    }
                  >
                    Confirm and Pay <BiRupee />
                    {cartLoading || cartUpdateLoading
                      ? "0"
                      : displayCurrency(cartDetails?.grand_total)}
                  </Button>
                </div>
              </>
            )}
          {cartDetails &&
            !cartLoading &&
            !cartUpdateLoading &&
            cartDetails.items?.length === 0 && (
              <div className="flex-column text-center disclaimerWrapper">
                <div className="h5 d-flex justify-content-center align-items-center disclaimer-info">
                  <h3>No Items added to cart</h3>
                </div>
                <Button
                  onClick={() => history.push("/")}
                  className="dis-back-btn"                
                >
                  Explore products
                </Button>
              </div>
            )}
        </section>
      </div>
    </div>
  ) : (
    <Spinner animation="border" role="status" />
  );

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
      customer_id: userDetails.sub,
      phone: userDetails.phone_number.substring(3),
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
      name: userDetails.name,
      order_id: order_id,
      upi_link: true,
      handler: async function (response) {
        // console.log("response", response);
        dispatch(getCart({ customer_id: userDetails.sub }));
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
        name: userDetails.name,
        contact: userDetails.phone_number.substring(3),
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
};

export default CartSummary;
