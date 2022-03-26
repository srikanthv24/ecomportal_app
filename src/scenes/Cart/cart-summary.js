/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAddresses, getCartSummary, getCart, hideAlert, showAlert } from "../../store/actions";
import ModalComponent from "../../components/Modal/modal";
import CartSummaryItem from "./cart-summary-item";
import { displayCurrency } from "../../helpers/displayCurrency";
import api_urls from "../../utils/UrlConfig";

const CartSummary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const AlertReducer = useSelector((state) => state.AlertReducer);
  const {cartSummary, cartDetails, cartLoading} = useSelector((state) => state.Cart);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if(userDetails.sub) {
      dispatch(getAddresses({ customerId: userDetails.sub }));
    }
  }, []);

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
    if (userDetails.sub)
      dispatch(getCartSummary({ customer_id: userDetails.sub }));
  }, [userDetails.sub, cartDetails]);

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
  }, [cartSummary.data, cartDetails?.items]);

  return (
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
          <div className="w-100p d-flex align-items-center">
            <div className="w-50">
              <p className="cart-summary-desc-item-container mb-0">
                Items{" "}
                <strong>
                  {(cartSummary?.data?.items?.length &&
                    cartSummary?.data?.items?.length) ||
                    0}
                </strong>
              </p>
            </div>
          </div>
        </div>

        <section className="cart-items-block">
          {cartSummary?.isLoading || cartLoading ? (
            <div
              className="d-flex flex-column align-items-center justify-content-center w-100"
              style={{ height: "100% " }}
            >
              <Spinner animation="grow" variant="primary" />
              Loading...
            </div>
          ) : cartSummary?.data?.items?.length ? (
            cartSummary?.data?.items?.map((item, index) => {
              return (
                <CartSummaryItem ProductDetails={item.item} pindex={index} />
              );
            })
          ) : (
            <div className="flex-column text-center">
              <div className="h5 d-flex justify-content-center align-items-center">
                No Items added to cart
              </div>
              <Button
                onClick={() => history.push("/")}
                variant="primary"
                style={{
                  backgroundColor: "rgba(53,40,23,1)",
                  borderColor: "rgba(53,40,23,1)",
                }}
                size="sm"
              >
                Explore products
              </Button>
            </div>
          )}
        </section>

        <section className="cart-order-summery-container mb-5">
          <p class="cart-order-summery-header mb-0">ORDER SUMMARY</p>
          <ul className="cart-order-summery-list mb-0">
            {/* <li>
          <p class="cart-order-summery-list-titles mb-0">Subtotal</p>
          <p class="cart-order-summery-list-subtotal mb-0">
             <BiRupee />{(cartSummary?.data && Number(cartSummary?.data?.sub_total)) ||0}</p>
         </li> */}
            {/* <li>
            <p class="cart-order-summery-list-titles mb-0">Discount</p> 
            <p class="cart-order-summery-list-discount mb-0">0</p>
         </li> */}
            {/* <li>
           <p class="cart-order-summery-list-titles mb-0">Delivery Charges</p>
           <p class="cart-order-summery-list-subtotal mb-0">
             <BiRupee />{(cartSummary?.data && Number(cartSummary?.data?.sub_total)) ||0}</p>
         </li> */}
            {/* <li>
           <p class="cart-order-summery-list-titles mb-0">Coupon Discount</p>
           <p class="cart-order-summery-list-coupon-discount mb-0">0</p>
         </li> */}
          </ul>
          <div class="flex justify-between px-3 py-2">
            <p class="cart-order-summery-list-total mb-0">Total</p>
            <p class="cart-order-summery-list-total-price mb-0">
              <BiRupee />
              {displayCurrency(cartSummary?.data?.grand_total)}
            </p>
          </div>
        </section>

        <section className="mt-4" style={{ display: "none" }}>
          <span className="d-flex justify-content-between align-items-center">
            <p>Sub-total</p>
            <p>
              <BiRupee />{" "}
              {displayCurrency(cartSummary?.data?.sub_total)}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p>Delivery Charges</p>
            <p>
              <BiRupee />
              {displayCurrency(cartSummary?.data?.sub_total)}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p className="fw-bold">Total</p>
            <p className="fw-bold">
              <BiRupee />
              {displayCurrency(cartSummary?.data?.grand_total)}
            </p>
          </span>
        </section>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            padding: 5,
            backgroundColor:"#F2CBBD"
          }}
        >
          <Button
            className="w-100 custom-primary-btn"
            style={{ boxShadow: "1px 2px 3px #ededed", padding: 5 }}
            onClick={handleContinue}
            disabled={cartSummary?.data?.items?.length ? false : true}
          >
            Confirm and Pay <BiRupee />{displayCurrency(cartSummary?.data?.grand_total)}
          </Button>
        </div>
      </div>
    </div>
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
    const res = await loadScript(
     `${api_urls.Razorpay_API_URL}`
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const req = {
      type: "createorder",
      items: items,
      amount: Number(
        parseInt(parseFloat(cartSummary?.data?.grand_total).toFixed(2)) * 100
      ),
      currency: "INR",
      receipt: "Receipt #20",
      id: cartSummary?.data?.items[0].id,
      customer_id: userDetails.sub,
      phone: userDetails.phone_number.substring(3),
    };

    const result = await fetch(
      `${api_urls.Payment_API_URL}`,
      { method: "POST", body: JSON.stringify(req) }
    ).then((res) => res.json());
    
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
