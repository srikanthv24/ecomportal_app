import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/actions/cart-item";
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
    dispatch(getCartItems({ cartId: Cart.cartDetails.id }));
  }, []);

  useEffect(() => {
    console.log("cartItemList==>", Cart);
  }, [Cart.cartItemList]);

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
          {Cart.cartItemList.map((item) => {
            total = total + item.qty;
            return item.qty ? (
              <CardProduct
                key={item.id}
                productId={item}
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
            <Button style={{ width: "100%" }}>
              Proceed to Buy ({total} item)
            </Button>
          </div>
        </>
      </div>
    </>
  );
};

export default Cart;
