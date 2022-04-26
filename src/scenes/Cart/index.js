import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "underscore";
import {
  getCart,
  hideAlert,
  showAlert,
  updateCartCount,
  updateCartQty,
} from "../../store/actions";
import CartItem from "../../components/CartItem/CartItem";
import { CART, PICKUP } from "../../utils/constants";
import OrderCheckList from "./order-checklist";
import { deleteCartItem } from "../../store/actions/cart-item";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import PaymentService from "../../services/payment_services";
import {PaymentStatusModal} from '../../components/PaymentStatusModal';

const CartSummary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onlinePayment = new PaymentService();
  const {
    sub: customerId,
    name: customerName,
    phone_number: customerMobile,
  } = useSelector((state) => state.auth.userDetails);
  const { cartDetails, cartLoading, cartUpdateLoading, cartCreated } =
    useSelector((state) => state.Cart);
  const {
    showAlert: alert,
    variant,
    alertMessage : transactionId,
  } = useSelector((state) => state.AlertReducer);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (customerId && !cartLoading) {
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

  const onGoToOrdersClick = () => {
    dispatch(hideAlert());
    dispatch(updateCartCount(0));
    history.push("/orders");
  };

  const onGoToCartClick = () => {
    dispatch(hideAlert());
  }

  const onRetryPaymentClick = () => {
    dispatch(hideAlert());
    handleOnlinePayment();
  }

  const handleOnlinePayment = () => {
    setLoading(true);
    onlinePayment.InitPayment(
      {
        amount: cartDetails?.grand_total,
        currency: "INR",
        customer_id: customerId,
        customer_name: customerName,
        customer_phone: customerMobile,
        cart_id: cartDetails?.items[0].id,
        items: items,
      },
      (res) => {
        if (res.type === "failure") {
          setLoading(false);
          dispatch(
            showAlert({
              variant: "failure",
              title: "Payment Failed",
            })
          );
        } else {
          setLoading(false);
          dispatch(getCart({ customer_id: customerId }));
          dispatch(
            showAlert({
              message: res.payload.razorpay_payment_id,
              variant: "success",
              title: "Payment Success",
            })
          );
        }
      }
    );
  };

  return (
    <>
      <PaymentStatusModal
        show={alert}
        type={variant}
        transactionId={transactionId}
        handleClose={() => dispatch(hideAlert())}
        onGoToOrdersClick={onGoToOrdersClick}
        onGoToCartClick={onGoToCartClick}
        onRetryClick={onRetryPaymentClick}
      />
      <div className="cart-summary-wrapper">
        <p className="h3 page-title">{CART.CART_TITLE}</p>
        <div className="d-flex align-items-center w-100p">
          {!cartLoading &&
            !cartUpdateLoading &&
            cartDetails &&
            cartDetails.items?.length > 0 && (
              <p className="cart-list-product-detailes-despname mb-0">
                {`${CART.TOTAL} ${cartDetails?.items?.length || 0} ${
                  CART.ITEMS_IN_CART
                }`}
              </p>
            )}
        </div>
        {loading || cartLoading || cartUpdateLoading ? (
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

              const planDuration = product?.item?.variants?.map((item) =>
                item.display_name === CART.DURATION
                  ? item.items[0].display_name
                  : 0
              );
              let address = "";
              const selectedSessions = [];
              product?.item?.subscription?.map((item, itemIndex) => {
                selectedSessions.push(item.meal_type);
                if (itemIndex === 0) {
                  address = item.isDelivery
                    ? `#${item.address.aline1}, ${item.address.aline2}, ${item.address.landmark}, ${item.address.city} ${item.address.postalcode}`
                    : PICKUP;
                }
              });

              return (
                <CartItem
                  key={product.ciid}
                  product={product.item}
                  isMealItem={isMealItem}
                  productIndex={index}
                  duration={planDuration}
                  isDelivery={deliveryStatus}
                  address={address}
                  itemGrandTotal={product?.grand_total}
                  selectedSessions={selectedSessions}
                  loading={cartLoading}
                  onQtyIncrement={onCartItemIncrement}
                  onQtyDecrement={onCartItemDecrement}
                  onDelete={onDeleteCartItem}
                />
              );
            })}
            {cartDetails?.items?.length > 0 && (
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
                    className="vl-custom-btn abcd"
                    onClick={handleOnlinePayment}
                  >
                    {CART.CONFIRM_AND_PAY}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        {(_.isEmpty(cartDetails) || _.isEmpty(cartDetails.items)) &&
        !cartLoading &&
        !cartUpdateLoading ? (
          <EmptyCart />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CartSummary;
