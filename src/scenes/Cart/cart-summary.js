/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../store/actions";
import { getCartSummary, getCart } from "../../store/actions/cart";
import CartSummaryItem from "./cart-summary-item";
import { hideAlert, showAlert } from "../../store/actions/alert";
import { useHistory } from "react-router";
import ModalComponent from "../../components/Modal/modal";

var phantom = {
  display: "block",
  padding: "10px",
  height: "10px",
  width: "100%",
};

const CartSummary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const AlertReducer = useSelector((state) => state.AlertReducer);
  const Cart = useSelector((state) => state.Cart);
  const [items, setItems] = useState([]);
 
  useEffect(() => {
    dispatch(getAddresses({ customerId: userDetails.sub }));
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
  const cartSummary = useSelector((state) => state.Cart.cartSummary);

  useEffect(() => {
    if (userDetails.sub)
      dispatch(getCartSummary({ customer_id: userDetails.sub }));
  }, [userDetails.sub]);

  useEffect(() => {
    if(cartSummary.data && cartSummary.data.items.length){
      let temp =[];
      cartSummary.data.items.map((item, index) => {
        let obj = { 
          ciid: item.ciid,
          sub_total: item.item.sub_total
        }
        temp.push(obj);
      });
      setItems(temp);
    }
  }, [cartSummary.data])




  console.log("ghjklkjhghj",cartSummary);
  console.log("ababaab", items);

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

      <div className="p-2 bg-1">
        <p className="h3 page-title">Cart Summary</p>
        <p className="h6 text-muted">
          {(cartSummary?.data?.items?.length &&
            // cartSummary?.data?.items[0]?.items?.length) ||
            cartSummary?.data?.items?.length) ||
            0}{" "}
          Items
        </p>
        <section
          style={{
            height: 250,
            maxHeight: 250,
            width: "100%",
            overflow: "auto",
          }}
        >
          {cartSummary?.isLoading ? (
            <div
              className="d-flex flex-column align-items-center justify-content-center w-100"
              style={{ height: "100% " }}
            >
              <Spinner animation="grow" variant="primary" />
              Loading...
            </div>
          ) : cartSummary?.data?.items?.length ? (
            // cartSummary?.data?.items[0]?.items?.map((item) => {
              cartSummary?.data?.items?.map((item,index) => {
              return <CartSummaryItem ProductDetails={item.item} pindex={index}/>;
            })
          ) : (
            <div className="flex-column text-center">
              <div className="h5 d-flex justify-content-center align-items-center">
                No Items added to cart
              </div>
              <Button
                onClick={() => history.push("/")}
                variant="outline-primary"
                size="sm"
              >
                Explore products
              </Button>
            </div>
          )}
        </section>
      
        <section className="mt-4">
          <span className="d-flex justify-content-between align-items-center">
            <p>Sub-total</p>
            <p>
              <BiRupee />{" "}
              {(cartSummary?.data &&      
                Number(cartSummary?.data?.sub_total)) ||
                0}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p>Delivery</p>
            <p>
              <BiRupee />{" "}
              {(cartSummary?.data &&             
                  Number(cartSummary?.data?.sub_total)) ||
                  0}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p className="fw-bold">Total</p>
            <p className="fw-bold">
              <BiRupee />{" "}
              { (cartSummary.data !== null)  ? Number(cartSummary?.data?.grand_total) :  0}
            </p>
          </span>
        </section>
        <div style={phantom} />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            padding: 5,
          }}
        >
          <Button
            className="w-100 custom-btn-secondary"
            style={{ boxShadow: "1px 2px 3px #ededed", padding:5 }}
            onClick={handleContinue}
            // disabled={cartSummary?.data?.items?.length}
            disabled={cartSummary?.data?.items?.length ? false : true}
          >
            Confirm and Pay <BiRupee />
            {Number(
              cartSummary?.data &&
                cartSummary?.data?.grand_total
            ).toFixed(2)}
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
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    console.log("RESPOINSNS", res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const req = {
      type: "createorder",
      items: items,
      amount: 100 * 100,
      //amount: Number(parseInt(parseFloat(cartSummary?.data?.grand_total).toFixed(2)) * 100),
      //amount: Number(cartSummary?.data?.grand_total * 100),
      currency: "INR",
      receipt: "Receipt #20",
      id: cartSummary?.data?.items[0].id,
      // id: Cart.cartDetails.items[0].id,
      customer_id: userDetails.sub,
      phone: userDetails.phone_number.substring(3),
    };

    console.log("zzzzzz",req);
    const result = await fetch(
      "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
      { method: "POST", body: JSON.stringify(req) }
    ).then((res) => res.json());

    console.log(
      req,
      parseFloat(cartSummary?.data?.items[0]?.grand_total).toFixed(2)
    );
    console.log("RESS", result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;
    const options = {
      key: "rzp_test_QmipkFQ5tachW2", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: userDetails.name,
      order_id: order_id,
      upi_link: true,
      handler: async function (response) {
        console.log("response", response);
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
        // const data = {
        //   type: "success",
        //   phone: userDetails.phone_number.substring(3),
        //   amount: amount.toString(),
        //   orderCreationId: order_id,
        //   cart_id: Cart.cartDetails.items[0].id,
        //   razorpayPaymentId: response.razorpay_payment_id,
        //   razorpayOrderId: response.razorpay_order_id,
        //   razorpaySignature: response.razorpay_signature,
        //   description: "VL",
        // };

        //console.log(data);
        // const result = await fetch(
        //   "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
        //   { body: JSON.stringify(data), method: "POST" }
        // ).then((res) => res.json());
        // alert(result.data.msg);
        //console.log("REDD=>", result);

        // if (result.status === "success") {
        //   console.log("200");
        //   dispatch(getCartSummary({ customer_id: userDetails.sub }));
        //   dispatch(getCart({ customer_id: userDetails.sub }));
        // } else {
        //   console.log("401");
        // }
      },
      prefill: {
        name: userDetails.name,
        contact: userDetails.phone_number.substring(3),
        // email: '@gmail.com',
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
