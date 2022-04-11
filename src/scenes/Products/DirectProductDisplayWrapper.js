import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NonSubscriptionProductDisplay from "../../components/NonSubscriptionProductDetails";
import {
  createCart,
  getProductDetails,
  showLogin,
  updateCartQty,
} from "../../store/actions";
import { deleteCartItem } from "../../store/actions/cart-item";
import VibrantDirectMealPlanner from "../VibrantDirectMealPlanner";

const DirectProductDisplayWrapper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cartDetails, cartLoading, cartUpdateLoading } = useSelector(
    (state) => state.Cart
  );
  const { sub: customerId } = useSelector((state) => state.auth.userDetails);

  const [existingProduct, setExistingProduct] = useState({
    ciid: "",
    customer_id: "",
    item: {
      item_name: "",
      qty: 0,
    },
  });

  const { loading: productsLoading, productDetails } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [id]);

  const handleCartItem = () => {
    if (customerId) {
      let temp = { item_id: productDetails.id };
      dispatch(
        createCart({
          customer_id: customerId,
          item: { ...temp, qty: 1 },
          accessToken: localStorage.getItem("token"),
        })
      );
    } else {
      dispatch(showLogin());
    }
  };

  const onIncrement = () => {
    dispatch(
      updateCartQty({
        cart_item_id: existingProduct.ciid,
        id: cartDetails.items[0].id,
        customer_id: customerId,
        item_id: existingProduct.item.item_id,
        qty: existingProduct.item.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    if (existingProduct.item.qty === 1) {
      dispatch(
        deleteCartItem({
          cart_item_id: existingProduct.ciid,
          id: cartDetails?.items[0]?.id,
          customer_id: customerId,
        })
      );
      setExistingProduct({ item: { qty: 0 } });
    } else {
      dispatch(
        updateCartQty({
          cart_item_id: existingProduct.ciid,
          id: cartDetails.items[0].id,
          customer_id: customerId,
          item_id: existingProduct.item.item_id,
          qty: existingProduct.item.qty - 1,
        })
      );
    }
  };

  useEffect(() => {
    cartDetails?.items &&
      cartDetails?.items?.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item.item && item?.item?.item_id === productDetails.id
          ? setExistingProduct({
              ...productDetails,
              ...item,
              item: { ...item.item, qty: item.item.qty },
            })
          : null;
        return null;
      });
  }, [cartDetails, productDetails]);

  return (
    <>
      {productsLoading || cartLoading || cartUpdateLoading ? (
        <div className="fullscreen-loader">
          <Spinner animation="border" role="status" />
        </div>
      ) : null}
      {productDetails?.is_mealplan ? (
        <VibrantDirectMealPlanner />
      ) : (
        <NonSubscriptionProductDisplay
          productDetails={productDetails}
          handleCartItem={handleCartItem}
          cartLoading={cartLoading}
          cartUpdateLoading={cartUpdateLoading}
          existingProduct={existingProduct}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
      )}
    </>
  );
};

export default DirectProductDisplayWrapper;
