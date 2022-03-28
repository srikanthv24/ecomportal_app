import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Card, Button } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";

import { deleteCartItem } from "../../store/actions/cart-item";
import { updateCartQty } from "../../store/actions";
import { displayCurrency } from "../../helpers/displayCurrency";
import "./styles.css";

const CartSummaryItem = ({ ProductDetails, pindex }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [isExpanded, setisExpanded] = useState(false);

  const [Addresses, setAddresses] = useState({
    B: "",
    L: "",
    D: "",
  });

  const [mealItem, setMealItem] = useState(false);
  const [Duration, setDuration] = useState(null);
  const onDelete = (pindex) => {
    dispatch(
      deleteCartItem({
        cart_item_id: Cart?.cartDetails?.items[pindex].ciid,
        id: Cart?.cartDetails?.items[pindex]?.id,
        customer_id: userDetails.sub,
      })
    );
  };

  useEffect(() => {
    let temp = { ...Addresses };
    if (ProductDetails.subscription && ProductDetails.subscription.length) {
      setMealItem(true);
    } else {
      setMealItem(false);
    }
    ProductDetails?.subscription?.map((item, index) => {
      if (item.isDelivery) {
        temp[item?.meal_type] =
          item.address.tag +
          ":" +
          item.address.aline1 +
          ", " +
          item.address.aline2 +
          ", " +
          item.address.landmark +
          ", " +
          item.address.city +
          ", " +
          item.address.postalcode;
      } else {
        temp[item?.meal_type] = "Pickup";
      }
    });
    setAddresses(temp);

    ProductDetails?.variants?.map((item) => {
      if (item.display_name == "Duration") {
        setDuration(item.items[0].display_name);
      }
    });
  }, [ProductDetails]);

  const onIncrement = (pindex) => {
    dispatch(
      updateCartQty({
        cart_item_id: Cart.cartDetails.items[pindex].ciid,
        id: Cart.cartDetails.items[pindex].id,
        customer_id: userDetails.sub,
        item_id: ProductDetails.item_id,
        qty: ProductDetails.qty + 1,
      })
    );
  };

  const onDecrement = (pindex) => {
    if (ProductDetails.qty == 1) {
      dispatch(
        deleteCartItem({
          cart_item_id: Cart?.cartDetails?.items[pindex].ciid,
          id: Cart?.cartDetails?.items[pindex]?.id,
          customer_id: userDetails.sub,
        })
      );
    } else {
      dispatch(
        updateCartQty({
          cart_item_id: Cart.cartDetails.items[pindex].ciid,
          id: Cart.cartDetails.items[pindex].id,
          customer_id: userDetails.sub,
          item_id: ProductDetails.item_id,
          qty: ProductDetails.qty - 1,
        })
      );
    }
  };

  return (
    <div className="w-100p">
      <Card className="my-1 bg-1">
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div className="cart-list-image-container">
            <img src={ProductDetails.defaultimg_url} alt="img" />
          </div>
          <div style={{ width: "calc(100% - 7rem)", paddingLeft: "10px" }}>
            <Card.Text className="cart-list-product-detailes-name mb-0 clr-black">
              {ProductDetails.item_name}
            </Card.Text>
            <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
              {ProductDetails.category}
            </p>
            <p className="col-12 ff-4 clr-black cart-list-product-detailes-attribute-kind mb-0">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("GST", "GST ")
                .replace("OUTPUT", " %")
                .replace("-", "")}
            </p>
            <p className="cart-list-product-detailes-attribute-kind mb-2">
              Tax {ProductDetails?.tax_amount} Includes{" "}
            </p>
            <p className="ff-2 clr-black mb-0 d-flex justify-content-between">
              <div className="ff-2 mb-0 cart-list-product-detailes-sale-price">
                <BiRupee />
                {displayCurrency(ProductDetails.sub_total)}
              </div>
            </p>

            {mealItem && isExpanded && (
              <div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  Subscribed for {Duration}
                </span>
                {Addresses.B && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Breakfast Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.B}
                    </span>
                  </div>
                )}

                {Addresses.L && (
                  <div className="d-flex flex-column mb-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Lunch Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.L}
                    </span>
                  </div>
                )}
                {Addresses.D && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Dinner Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.D}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="cart-summary-footer">
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => (!Cart.cartLoading ? onDecrement(pindex) : null)}
              disabled={Cart.cartLoading}
            >
              <GrSubtract />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => (!Cart.cartLoading ? onDecrement(pindex) : null)}
              disabled={Cart.cartLoading}
            >
             {ProductDetails.qty}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => (!Cart.cartLoading ? onIncrement(pindex) : null)}
              disabled={Cart.cartLoading}
            >
              <GrAdd />
            </button>
          </div>
          {mealItem && (
            <div>
              {isExpanded ? (
                <span
                  variant="link"
                  className="w-100 text-center clr-black"
                  onClick={() => setisExpanded(false)}
                >
                  <AiFillCaretUp /> view less
                </span>
              ) : (
                <span
                  variant="link"
                  className="w-100 text-center clr-black"
                  onClick={() => setisExpanded(true)}
                >
                  <AiFillCaretDown /> view more
                </span>
              )}
            </div>
          )}
          <div
            style={{
              borderRadius: "50%",
              display: "inline-flex",
            }}
          >
            <Button
              className="delete-button"
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(pindex)}
            >
              <BsTrashFill />
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CartSummaryItem;
