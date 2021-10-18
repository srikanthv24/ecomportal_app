/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAddresses } from "../../store/actions";
import { getCartSummary, getCart } from "../../store/actions/cart";
import CartSummaryItem from "./cart-summary-item";
import { showAlert } from "../../store/actions/alert";

var phantom = {
  display: "block",
  padding: "10px",
  height: "10px",
  width: "100%",
};

const CartSummary = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const Cart = useSelector((state) => state.Cart);
  const [AddressSelected, setAddressSelected] = useState({});
  const [AddressList, setAddressList] = useState([]);
  const [ChangeAddress, setChangeAddress] = useState(false);

  useEffect(() => {
    dispatch(getAddresses({ customerId: userDetails.sub }));
  }, []);

  useEffect(() => {
    console.log("Addresses-->", Addresses);
    let temp = [];

    if (Addresses.listAddresses) {
      console.log("Im Print", Addresses.listAddresses.items);
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
        if (address.tag == "Home" || address.tag == "home") {
          setAddressSelected(address);
        }
      });
      setAddressList(temp);
      console.log("Addresses-->2", temp);
    }
  }, [Addresses.listAddresses]);
  const cartSummary = useSelector((state) => state.Cart.cartSummary);

  useEffect(() => {
    dispatch(getCartSummary({ customer_id: userDetails.sub }));
  }, []);

  useEffect(() => {
    console.log("CartSummary--+>", cartSummary);
  }, [cartSummary]);

  return (
    <div>
      <div className="m-2">
        <p className="h3">Cart Summary</p>
        <p className="h6 text-muted">
          {(cartSummary?.data?.items?.length &&
            cartSummary?.data?.items[0]?.items?.length) ||
            0}{" "}
          Items
        </p>
        <section
          style={{
            height: '30%',
            maxHeight: '30%',
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
          ) : (
            cartSummary?.data?.items?.length &&
            cartSummary?.data?.items[0]?.items?.map((item) => {
              return <CartSummaryItem ProductDetails={item} />;
            })
          )}
        </section>
        {/* <section className="mt-3">
          <div className="d-flex align-items-baseline justify-content-between">
            <p className="h6 text-muted">Deliver to</p>
            {!ChangeAddress && (
              <Button
                variant="light"
                size="small"
                onClick={() => setChangeAddress(true)}
              >
                <GrEdit size={14} /> Change
              </Button>
            )}
          </div>
          {ChangeAddress ? (
            <Select
              options={AddressList}
              onChange={(val) => {
                setAddressSelected(val);
                setChangeAddress(false);
              }}
            />
          ) : (
            <p className="fs-6 fw-bold pl-2 pr-2">
              {AddressSelected.aline1}, {AddressSelected.aline2},
              {AddressSelected.landmark}, {AddressSelected.city},
              {AddressSelected.state}, {AddressSelected.postalcode}.
            </p>
          )}
          <small className="text-muted">
            <b>Note:</b> This delivery address is for non-subscription products.
          </small>
        </section> */}
        <section className="mt-4">
          <span className="d-flex justify-content-between align-items-center">
            <p>Sub-total</p>
            <p>
              <BiRupee />{" "}
              {(cartSummary?.data?.items?.length &&
                cartSummary?.data?.items[0]?.sub_total &&
                Number(cartSummary?.data?.items[0]?.sub_total).toFixed(2)) ||
                0}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p>Delivery</p>
            <p>
              <BiRupee />{" "}
              {(cartSummary?.data?.items?.length &&
                cartSummary?.data?.items[0]?.delivery &&
                Number(cartSummary?.data?.items[0]?.delivery).toFixed(2)) ||
                0}
            </p>
          </span>
          <span className="d-flex justify-content-between align-items-center">
            <p className="fw-bold">Total</p>
            <p className="fw-bold">
              <BiRupee />{" "}
              {cartSummary?.data?.items?.length &&
                Number(cartSummary?.data?.items[0]?.grand_total).toFixed(2)}
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
            className="w-100"
            style={{ boxShadow: "1px 2px 3px #ededed", padding: 5 }}
            onClick={handleContinue}
          >
            Confirm and Pay <BiRupee />
            {Number(
              cartSummary?.data && cartSummary?.data?.items[0]?.grand_total
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
      amount:
        parseInt(
          parseFloat(cartSummary?.data?.items[0]?.grand_total).toFixed(2)
        ) * 100,
      currency: "INR",
      receipt: "Receipt #20",
      cart_id: Cart.cartDetails.items[0].id,
      customer_id: userDetails.sub,
      phone: userDetails.phone_number.substring(3),
    };

    console.log(req);
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
        const data = {
          type: "success",
          phone: userDetails.phone_number.substring(3),
          amount: amount.toString(),
          orderCreationId: order_id,
          cart_id: Cart.cartDetails.items[0].id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          description: "VL",
        };

        console.log(data);
        const result = await fetch(
          "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
          { body: JSON.stringify(data), method: "POST" }
        ).then((res) => res.json());
        // alert(result.data.msg);
        console.log("REDD=>", result);

        if (result.status === "success") {
          console.log("200");
          dispatch(getCartSummary({ customer_id: userDetails.sub }));
          dispatch(getCart({ customer_id: userDetails.sub }));
        } else {
          console.log("401");
        }
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
        color: "#488DB7",
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
