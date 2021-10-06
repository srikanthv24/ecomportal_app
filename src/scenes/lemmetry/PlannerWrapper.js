import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCart,
  getCart,
  updateCart,
  updateCartQty,
} from "../../store/actions/cart";
import ProductDetails from "../Products/product-details";

const PlannerWrapper = ({ handleBack, isOnboarding = false }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mealPlanId = useSelector((state) => state.mealPlans);
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const methods = useForm({
    defaultValues: {
      item_id: "",
      qty: 1,
      sale_val: 0,
      subscription: [
        {
          address: {},
          isDelivery: false,
          meal_type: "breakfast",
          notes: "",
          order_dates: [],
          is_included: false,
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "lunch",
          notes: "",
          order_dates: [],
          is_included: false,
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "dinner",
          notes: "",
          order_dates: [],
          is_included: false,
        },
      ],
      variants: [],
    },
  });

  const { control, handleSubmit, reset, setValue } = methods;

  const handleCartSubmit = (data) => {
    let payload = { ...data };
    let filteredPayload = payload.subscription.filter((item) => {
      if (item.is_included) {
        delete item.is_included;
        return item;
      }
    });

    if (Cart.cartDetails.items.length && Cart.cartDetails.items[0].id) {
      dispatch(
        updateCart({
          customer_id: userDetails.sub,
          cart_id: Cart.cartDetails.items[0].id,
          item: { ...data, subscription: filteredPayload },
        })
      );
    } else {
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          items: [{ ...data, subscription: filteredPayload }],
        })
      );
    }
  };

  useEffect(() => {
    if (Cart?.cartDetails?.items?.length) {
      console.log("Cart?.cartDetails", Cart?.cartDetails);
      let ifExist = Cart.cartDetails.items[0].items.filter((item) => {
        if (item) {
          return item.item_id == products.productDetails.id;
        }
      });
      if (ifExist.length) {
        setExistingProduct(ifExist[0] || { qty: 0 });
      }

      // console.log("onIncerement", ifExist);
    }
  }, [Cart, products.productDetails]);

  const onIncrement = () => {
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty + 1,
      })
    );
  };

  useEffect(() => {
    console.log("products.productDetails", products.productDetails);
    console.log("Cart.cartDetails", Cart.cartDetails);
  }, [products.productDetails, Cart.cartDetails]);

  const onDecrement = () => {
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty - 1,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <ProductDetails productId={mealPlanId.mealPlanId} control={control} />

      <div className="w-100">
        {isOnboarding ? (
          <div className="d-flex mt-2">
            <Button
              onClick={handleBack}
              className="w-50 m-1"
              variant="secondary"
            >
              Back
            </Button>
            {ExistingProduct.qty ? (
              <Button
                className="w-50 m-1"
                variant="success"
                onClick={() => history.push("/cart")}
              >
                Go to Cart
              </Button>
            ) : (
              <Button
                className="w-50 m-1" style={{ width: "100%", background:'#F05922', borderColor:'#f05922' }}
                onClick={handleSubmit(handleCartSubmit)}
              >
                {Cart.cartLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            )}
          </div>
        ) : ExistingProduct.qty ? (
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" onClick={onDecrement}>
              {Cart.cartLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <GrSubtract />
              )}
            </Button>
            <FormControl
              aria-label="Example text with two button addons"
              style={{ textAlign: "center" }}
              value={ExistingProduct?.qty || ""}
              type="number"
              // onChange={(ev) => setCartItem(ev.target.value)}
            />

            <Button variant="outline-secondary" onClick={onIncrement}>
              {Cart.cartLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <GrAdd />
              )}
            </Button>
          </InputGroup>
        ) : null}

        <Button className="m-1" style={{ width: "100%", background:'#F05922', borderColor:'#f05922' }} onClick={handleSubmit(handleCartSubmit)}>
          <AiOutlineShoppingCart />
          {"  "}
          {Cart.cartLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </FormProvider>
  );
};

export default PlannerWrapper;
