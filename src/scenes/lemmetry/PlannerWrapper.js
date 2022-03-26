/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Spinner,
  Container,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showLogin } from "../../store/actions";
import {
  createCart,
  updateCart,
  updateCartQty,
} from "../../store/actions/cart";
import ProductDetails from "../Products/product-details";
import { deleteCartItem } from "../../store/actions/cart-item";
import { displayCurrency } from "../../helpers/displayCurrency";
import { AddressModal } from "../Products/address-modal";
import { createCustomer } from "../../store/actions/customer";

var phantom = {
  display: "block",
  padding: "60px",
  height: "10px",
  width: "100%",
};

const PlannerWrapper = ({ handleBack, isOnboarding = false, goal, cuisine, profileDetails }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mealPlanId = useSelector((state) => state.mealPlans);
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { isLoggedIn } = useSelector((state) => state.Login);
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Calculations, setCalculations] = useState({});
  const [SubscriptionTotal, setSubscriptionTotal] = useState(0);
  const [VarItems, setVarItems] = useState({});

  const [addresses, setAddresses] = useState([]);

  const [BreakUps, setBreakUps] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const { customerId: userId } = useSelector(state => state.customer);
  const { cartDetails: cartCreated } = useSelector(state => state.Cart);

  const methods = useForm({
    defaultValues: {
      item_id: "",
      qty: 1,
      // sale_val: 0,
      subscription: [
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "B",
          notes: "",
          order_dates: [],
          is_included: false,
        },
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "L",
          notes: "",
          order_dates: [],
          is_included: false,
        },
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "D",
          notes: "",
          order_dates: [],
          is_included: false,
        },
      ],
      variants: [],
    },
  });

  const { control, handleSubmit, setValue, watch } = methods;

  const { subscription, variants } = watch();

  useEffect(() => {
    if (formSubmitted && !isLoggedIn && userLoggedIn && userDetails.sub) handleSubmit(handleCartSubmit)();
  }, [formSubmitted, isLoggedIn, userLoggedIn, userDetails]);

  const handleAddToCart = () => {
    if (userDetails.sub) {
      handleSubmit(handleCartSubmit)();
      setFormSubmitted(true);
    } else {
      dispatch(showLogin());
      setFormSubmitted(true);
    }
  };

  const handleCartSubmit = (data) => {
    console.log("use_form_data", data);
    setShowModal(false);
    let payload = { ...data };
    let filteredPayload = payload.subscription.filter((item, index) => {
      //     item.hasOwnProperty("item.is_included") && item.item.is_included
      // )
      // .map((item) => {
      if (item.is_included) {
        delete item.is_included;
        if (item.isDelivery) {
          item.address = addresses[index];
          delete item.address.area;
        }
        if (item.addon_items && item.addon_items.length > 0) {
          console.log("inside loop at cart function");
          item.addon_items = item.addon_items.map((element) => {
            delete element.label;
            delete element.price;
            delete element.value;
            return element;
            // return {
            // 	item_id: element.item_id
            // }
          });
        }
        return item;
      }
      return false;
    });

    // console.log("filtered Payload", { ...data, subscription: filteredPayload });

    if (userDetails.sub) {
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          item: { ...data, subscription: filteredPayload },
          accessToken: localStorage.getItem("token"),
        })
      );
      dispatch(createCustomer({
        name: userDetails?.name,
        goal: goal && goal.length ? goal : "",
        id: userDetails?.sub,
        mobile: userDetails?.phone_number,
        age: profileDetails?.age,
        gender: profileDetails?.gender,
        heightFeet: profileDetails?.heightFeet,
        heightInches: profileDetails?.heightInch,
        weight: profileDetails?.weight,
      }));
    }
  };

  useEffect(() => {
    let temp = [...subscription];
    if (ExistingProduct?.subscription?.length) {
      console.log(
        "Subscription___",
        subscription,
        ExistingProduct.subscription
      );
      subscription.map((item) => {
        if (item.meal_type == "B") {
          item = {
            ...item,
            sale_val: products.productDetails.meal_prices.breakfast_price,
          };
        } else if (item.meal_type == "D") {
          item = {
            ...item,
            sale_val: products.productDetails.meal_prices.dinner_price,
          };
        } else if (item.meal_type == "L") {
          item = {
            ...item,
            sale_val: products.productDetails.meal_prices.lunch_price,
          };
        }
        ExistingProduct.subscription.map((itm) => {
          if (itm.meal_type == item.meal_type) {
            // temp.push({ ...item, is_included: true });
            let indx = temp.findIndex(
              (subscribed) => subscribed.meal_type == itm.meal_type
            );
            temp[indx] = { ...item, is_included: true };
          }
        });
      });
    }
    setValue("subscription", [...temp]);

    if (Cart?.cartDetails?.items?.length) {
      console.log("Cart?.cartDetails", Cart?.cartDetails);
      let ifExist = Cart?.cartDetails?.items.filter((item) => {
        if (item) {
          return item.item.item_id == products.productDetails.id;
        }
      });
      if (ifExist?.length) {
        setExistingProduct(ifExist[0] || { qty: 0 });
        // reset(ifExist[0]);
        // setValue('subscription[0]', ifExist[0].subscription)
      }
    }
  }, [Cart, products.productDetails, ExistingProduct]);

  const onIncrement = () => {
    console.log("gggggg", ExistingProduct);
    dispatch(
      updateCartQty({
        cart_item_id: ExistingProduct.ciid,
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item.item_id,
        qty: ExistingProduct.item.qty + 1,
      })
    );
  };

  // useEffect(() => {
  //   console.log("products.productDetails", products.productDetails);
  //   console.log("Cart.cartDetails", Cart.cartDetails);
  // }, [products.productDetails, Cart.cartDetails]);

  const onDecrement = () => {
    if (ExistingProduct.item.qty == 1) {
      dispatch(
        deleteCartItem({
          cart_item_id: ExistingProduct.ciid,
          id: Cart?.cartDetails?.items[0]?.id,
          customer_id: userDetails.sub,
        })
      );
      setExistingProduct({ qty: 0 });
    } else {
      dispatch(
        updateCartQty({
          cart_item_id: ExistingProduct.ciid,
          id: Cart.cartDetails.items[0].id,
          customer_id: userDetails.sub,
          item_id: ExistingProduct.item.item_id,
          qty: ExistingProduct.item.qty - 1,
        })
      );
    }
  };

  useEffect(() => {
    // console.log("subscription__", variants);
    let temp = 0;
    let tempArr = [];
    let duration = VarItems?.Duration?.duration;

    // console.log("itm.sale_val in useeffect____");
    subscription.map((subscribed) => {
      // console.log("itm.sale_val____1", subscribed);
      if (subscribed.is_included) {
        if (subscribed.meal_type == "B") {
          let aprice = 0;
          if (subscribed.addon_items && subscribed.addon_items.length > 0) {
            subscribed.addon_items.forEach((element) => {
              if (element.price) {
                aprice += element.price * element.qty;
              }
            });
          }
          subscribed = {
            ...subscribed,
            sale_val:
              (products.productDetails.meal_prices.breakfast_price + aprice) *
              duration,
          };
        } else if (subscribed.meal_type == "D") {
          let aprice = 0;
          if (subscribed.addon_items && subscribed.addon_items.length > 0) {
            subscribed.addon_items.forEach((element) => {
              if (element.price) {
                aprice += element.price * element.qty;
              }
            });
          }
          subscribed = {
            ...subscribed,
            sale_val:
              (products.productDetails.meal_prices.dinner_price + aprice) *
              duration,
          };
        } else if (subscribed.meal_type == "L") {
          let aprice = 0;
          if (subscribed.addon_items && subscribed.addon_items.length > 0) {
            subscribed.addon_items.forEach((element) => {
              if (element.price) {
                aprice += element.price * element.qty;
              }
            });
          }
          subscribed = {
            ...subscribed,
            sale_val:
              (products.productDetails.meal_prices.lunch_price + aprice) *
              duration,
          };
        }
        // console.log("itm.sale_val____11", subscribed);
        tempArr.push(subscribed);
        temp = temp + subscribed.sale_val;
      }
    });
    setBreakUps(tempArr);
    setSubscriptionTotal(temp);
  }, [
    subscription,
    subscription[0].addon_items,
    subscription[1].addon_items,
    subscription[2].addon_items,
  ]);

  const variantsSelected = (varItems) => {
    // console.log("itm.sale_val_____", varItems);
    setVarItems(varItems);
  };

  const updateAddress = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (userId && Object.keys(cartCreated).length && formSubmitted) {
      history.push("/cart-summary");
    }
  }, [userId, cartCreated, formSubmitted])


  // console.log("WIZARD___", goal, cuisine, profileDetails);
  return (
    <FormProvider {...methods}>
      <AddressModal
        customerId={userDetails.sub}
        handleClose={() => setShowModal(false)}
        showModal={showModal}
        // showModal={true}
        updateAddress={updateAddress}
        handleSubmit={handleSubmit(handleCartSubmit)}
      />
      <div className="bg-1">
        <Container fluid className="product-details-wrapper">
          <ProductDetails
            productId={cuisine}
            control={control}
            variantsSelected={variantsSelected}
            updateAddresses={setAddresses}
          />
        </Container>

        <div style={phantom} />
        <div
          className="bg-1"
          style={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 8,
            // background: "#FFF",
            zIndex: 0,
            paddingTop: 10,
            boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          {products.productDetails?.is_mealplan && (
            <div className="w-100 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="h6 ff-3">Subscription Amount :</p>
                <p className="h5 ff-2">
                  {/* <BiRupee /> {parseFloat(SubscriptionTotal).toFixed(2)} */}
                  <BiRupee />
                  {displayCurrency(SubscriptionTotal)}
                </p>
              </div>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between w-100">
            {isOnboarding ? (
              <>
                <Button
                  onClick={handleBack}
                  className="w-50 m-1"
                  variant="secondary"
                  style={{ borderColor: "rgba(54,41,24,0.75)" }}
                >
                  Back
                </Button>
                {ExistingProduct?.item?.qty.length > 1 ? (
                  <Button
                    className="w-50 m-1 custom-primary-btn"
                    // variant="success"
                    style={{ border: "none" }}
                    onClick={() => history.push("/cart-summary")}
                  >
                    Go to Cart
                  </Button>
                ) : (
                  <Button
                    className="w-50 m-1 custom-primary-btn"
                    style={{
                      width: "100%",
                    }}
                    onClick={() => {
                      handleAddToCart();
                    }}
                  >
                    {Cart.cartLoading ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                )}
              </>
            ) :
              ExistingProduct?.item?.qty ? (
                <InputGroup className="p-2 w-100">
                  <Button
                    variant="outline-secondary"
                    style={{
                      borderColor: "rgba(54,41,24,0.75)",
                      color: "#f05922",
                      width: "3rem",
                      height: "3rem",
                    }}
                    onClick={onDecrement}
                    size="sm"
                  >
                    {Cart.cartLoading ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      <GrSubtract />
                    )}
                  </Button>
                  <FormControl
                    aria-label="Example text with two button addons"
                    style={{
                      textAlign: "center",
                      border: "none",
                      borderColor: "rgba(54,41,24,0.75)",
                      background: "transparent",
                    }}
                    value={ExistingProduct?.item?.qty || ""}
                    type="number"
                  // onChange={(ev) => setCartItem(ev.target.value)}
                  />

                  <Button
                    variant="outline-secondary"
                    style={{
                      borderColor: "rgba(54,41,24,0.75)",
                      color: "#f05922",
                      width: "3rem",
                      height: "3rem",
                    }}
                    onClick={onIncrement}
                    size="sm"
                  >
                    {Cart.cartLoading ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      <GrAdd />
                    )}
                  </Button>
                </InputGroup>
              ) : null}

            {isOnboarding ? null : (
              <Button
                className="m-1 custom-primary-btn"
                // disabled={
                //   products?.productDetails?.is_mealplan
                //     ? subscription.filter((item) => item.is_included).length
                //       ? subscription.filter((item) => item.isDelivery).length
                //         ? !subscription.filter(
                //             (item) => item.address.aline1 && item
                //           ).length
                //           ? true
                //           : false
                //         : false
                //       : true
                //     : false
                // }
                style={{
                  width: "100%",
                  height: "3rem",
                }}
                onClick={handleSubmit(handleCartSubmit)}
              >
                <AiOutlineShoppingCart />
                {"  "}
                {Cart.cartLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  "Add to cart"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default PlannerWrapper;
