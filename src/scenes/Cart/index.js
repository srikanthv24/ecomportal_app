import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  const history = useHistory();
  let total = 0;
  // let totalPrice = 0;
  const Cart = useSelector((state) => state.Cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    dispatch(getCart({ customer_id: userDetails?.sub }));
  }, []);

  const calculatePrice = (price) => {
    setTotalPrice((prevstate) => prevstate + price);
    console.log("totalPrice", totalPrice);
  };

  return (
    <section className="bg-1" style={{minHeight:'calc(100vh - 126px)'}}>
      <div style={phantom2}  />
      <Card.Header
        style={{
          position: "fixed",
          top: 118,
          zIndex: 999,
          width: "100%",
          background: "transparent",
        }}
      >
        <div className="w-100 text-left">
          <div className="d-block text-left">
            <p className="h5 m-0 p-0 page-title"> Cart</p>
            <small className="text-muted value-txt">
              Sub-Total: {Number(totalPrice)?.toFixed(2)}
            </small>
          </div>
          <div></div>
        </div>
      </Card.Header>
      <div div style={{ padding: 10 }}>
        <>
          {Cart?.cartDetails?.items?.length ? (
            // Cart?.cartDetails?.items[0]?.items?.map((item) => {
              Cart?.cartDetails?.items?.map((item) => {
              if (item) {
                console.log("ITEM-->", item);
                total = total + item.item.qty;
              }

              return item.item && item.item?.qty ? (
                <CardProduct
                  key={item.item.id}
                  productId={item && item.item}
                  cartDetails={Cart?.cartDetails}
                  totalQty={total}
                  pushPrice={(p) => calculatePrice(p)}
                />
              ) : null;
            })
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <h5>No Items found!</h5>
              <Button onClick={() => history.push("/")} className="btn custom-btn-secondary">
                Explore products now
              </Button>
            </div>
          )}
          <div style={phantom} />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              left: 0,              
              padding: 10,
              boxShadow: "1px 0px 3px 0px rgba(0,0,0,0.4)",
              zIndex: 10000,
            }}
          >
            <Button className="btn custom-btn-secondary"
              style={{ width: "100%" }}
              // onClick={handleContinue}
              onClick={() => history.push("/cart-summary")}
            >
              Proceed to Buy ({total} item)
            </Button>
          </div>
        </>
      </div>
    </section>
  );
};

export default Cart;
