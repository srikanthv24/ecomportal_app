const RAZORPAY_API_URL = process.env.REACT_APP_Razorpay_API_URL;
const PAYMENT_API_URL = process.env.REACT_APP_Payment_API_URL;
const PAYMENT_KEY = process.env.REACT_APP_payment_key;

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

class PaymentService {
  async InitPayment(data, cb) {
    const res = await loadScript(`${RAZORPAY_API_URL}`);
    let {
      amount,
      currency,
      customer_name : customerName,
      customer_phone: customerMobile,
      cart_id: cartId,
      customer_id: customerId,
      items,
    } = data;
    amount = amount * 100;

    if (!res) {
      cb({ type: "failure", payload: res });
      // alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const req = {
      type: "createorder",
      items: items,
      amount: amount,
      currency: "INR",
      receipt: "Receipt #20",
      id: cartId,
      customer_id: customerId,
      phone: customerMobile,
    };

    const result = await fetch(`${PAYMENT_API_URL}`, {
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res.json());

    if (!result) {
      cb({ type: "failure", payload: result });
      // alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { id: order_id } = result;
    const options = {
      key: `${PAYMENT_KEY}`, // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: customerName,
      order_id: order_id,
      upi_link: true,
      handler: async function (response) {
        cb({ type: "success", payload: response });
      },
      prefill: {
        name: customerName,
        contact: customerMobile,
      },
      notes: {
        address: "VL",
      },
      theme: {
        color: "#f05922",
      },
      modal: {
        ondismiss: function(){
            // console.log('Checkout form closed');
            cb({ type: "failure", payload: result });
        }
    }
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) => {
      // console.log("FailedResponse", response);
      cb({ type: "failure", payload: response });
    });
    paymentObject.open();
  }
}

export default PaymentService;
