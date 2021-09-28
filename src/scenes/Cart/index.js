import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/actions/cart";
import CardProduct from "./cart-product";

var phantom = {
  display: "block",
  padding: "20px",
  height: "100px",
  width: "100%",
};

var phantom2 = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const Cart = () => {
  let total = 0;
  // let totalPrice = 0;
  const Cart = useSelector((state) => state.Cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart({ customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16" }));
  }, []);

  useEffect(() => {
    console.log("cartItemList==>", Cart);
  }, [Cart.cartDetails]);

  const calculatePrice = (price) => {
    setTotalPrice((prevstate) => prevstate + price);
    console.log("totalPrice", totalPrice);
  };

  return (
    <>
      <div style={phantom2} />
      <Card.Header
        style={{
          position: "fixed",
          top: 118,
          zIndex: 999,
          width: "100%",
          background: "#f5f5f5",
        }}
      >
        <div className="w-100">
          <div>
            <p className="h5 m-0 p-0"> Cart</p>
            <small className="text-muted">
              Sub-Total: {Number(totalPrice).toFixed(2)}
            </small>
          </div>
          <div></div>
        </div>
      </Card.Header>
      <div div style={{ padding: 10 }}>
        <>
          {Cart?.cartDetails?.items?.length &&
            Cart.cartDetails?.items[0]?.items?.map((item) => {
              if (item) {
                console.log("ITEM-->", item);
                total = total + item.qty;
              }

              return item && item.qty ? (
                <CardProduct
                  key={item.id}
                  productId={item && item}
                  cartDetails={Cart.cartDetails}
                  totalQty={total}
                  pushPrice={(p) => calculatePrice(p)}
                />
              ) : null;
            })}
          <div style={phantom} />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              left: 0,
              background: "#FFF",
              padding: 10,
              boxShadow: "1px 0px 3px 0px rgba(0,0,0,0.4)",
              zIndex: 10000,
            }}
          >
            <Button style={{ width: "100%" }} onClick={handleContinue}>
              Proceed to Buy ({total} item)
            </Button>
          </div>
        </>
      </div>
    </>
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

    // creating a new order
    // const req = {
    //   orderCreationId: order_id,
    //   razorpayPaymentId: response.razorpay_payment_id,
    //   razorpayOrderId: response.razorpay_order_id,
    //   razorpaySignature: response.razorpay_signature,
    // };

    const req = {
      type: "createorder",
      amount: 5000,
      currency: "INR",
      receipt: "Receipt #20",
      cart_id: "1232434",
      customer_id: "343513454",
      phone: "8121153287",
    };

    console.log(req);
    const result = await fetch(
      "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
      { method: "POST", body: JSON.stringify(req) }
    ).then((res) => res.json());

    console.log(req);
    console.log("RESS", result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;
    const options = {
      key: "rzp_test_QmipkFQ5tachW2", // Enter the Key ID generated from the Dashboard
      amount: 5000,
      currency: currency,
      name: "VL",
      description: "hello",
      order_id: order_id,
      upi_link: true,
      handler: async function (response) {
        console.log("response", response);
        const data = {
          type: "success",
          phone: 8121153287,
          amount: amount.toString(),
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          description: "VL",
        };

        console.log(data);
        const result = await fetch(
          "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
          { body: JSON.stringify(data), method: "POST" }
        ).then(res => res.json());
        // alert(result.data.msg);
        console.log(result);

        if (result.status === 200) {
          console.log("200");
        } else {
          console.log("401");
        }
      },
      prefill: {
        name: "santosh",
        contact: "8121153287",
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
    paymentObject.open();
  }
};

export default Cart;
