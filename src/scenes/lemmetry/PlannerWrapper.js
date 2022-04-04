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
import { showLogin, setScheduleErrorStatus } from "../../store/actions";
import {
  createCart,
  updateCart,
  updateCartQty,
  deleteCart,
} from "../../store/actions/cart";
import ProductDetails from "../Products/product-details";
import { deleteCartItem } from "../../store/actions/cart-item";
import { displayCurrency } from "../../helpers/displayCurrency";
import { AddressModal } from "../Products/address-modal";
import { createCustomer } from "../../store/actions/customer";
import { useLocation } from "react-router-dom";
import { MEAL_PRICE_TYPES } from "../../utils/constants";

var phantom = {
  display: "block",
  padding: "60px",
  height: "10px",
  width: "100%",
};

const PlannerWrapper = ({
  handleBack,
  isOnboarding = false,
  goal,
  cuisine,
  profileDetails,
}) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const mealPlanId = useSelector((state) => state.mealPlans);
  const [ExistingProduct, setExistingProduct] = useState({
    ciid: "",
    customer_id: "",
    item: {
      item_name: "",
      qty: 0,
    },
  });
  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { isLoggedIn } = useSelector((state) => state.Login);
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Calculations, setCalculations] = useState({});
  const [SubscriptionTotal, setSubscriptionTotal] = useState(0);
  const [VarItems, setVarItems] = useState({});

  const [addresses, setAddresses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [BreakUps, setBreakUps] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const { customerId: userId } = useSelector((state) => state.customer);
  const { cartCreated, cartDetails } = useSelector((state) => state.Cart);

  const [sideEffect, setSideEffect] = useState(false);

  const methods = useForm({
    defaultValues: {
      item_id: "",
      qty: 1,
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
    if (formSubmitted && !isLoggedIn && userLoggedIn && userDetails.sub)
      handleSubmit(handleCartSubmit)();
  }, [formSubmitted, isLoggedIn, userLoggedIn, userDetails]);

  const handleAddToCart = () => {
    const isValidated = validateAddToCart();
    if (!isValidated) return;
    if (userDetails.sub) {
      handleSubmit(handleCartSubmit)();
      setSideEffect(true);
    } else {
      dispatch(showLogin());
      setFormSubmitted(true);
      setSideEffect(true);
    }
  };
  useEffect(() => {
    dispatch(deleteCart());
  }, []);

  useEffect(() => {
    if (
      userId &&
      Object.keys(cartCreated || cartDetails).length &&
      sideEffect
    ) {
      history.push("/cart-summary");
    }
  }, [userId, cartCreated, sideEffect]);

  const handleCartSubmit = (data) => {
    console.log("use_form_data", data);
    setShowModal(false);
    let payload = { ...data };
    let filteredPayload = payload.subscription.filter((item, index) => {
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

    if (userDetails.sub) {
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          item: { ...data, subscription: filteredPayload },
          accessToken: localStorage.getItem("token"),
        })
      );
      if (location.pathname == "/subscription") {
        dispatch(
          createCustomer({
            name: userDetails?.name,
            goal: goal && goal.length ? goal : "",
            id: userDetails?.sub,
            mobile: userDetails?.phone_number,
            age: profileDetails?.age,
            gender: profileDetails?.gender,
            heightFeet: profileDetails?.heightFeet,
            heightInches: profileDetails?.heightInch,
            weight: profileDetails?.weight,
          })
        );
      }
    }
  };

  useEffect(() => {
    let temp = [...subscription];
    if (ExistingProduct?.subscription?.length) {
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
  }, [Cart, products.productDetails, ExistingProduct]);

  useEffect(() => {
    Cart?.cartDetails &&
      Cart.cartDetails?.items &&
      Cart.cartDetails?.items?.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item.item && item?.item?.item_id == products.productDetails.id
          ? setExistingProduct({
              ...products.productDetails,
              ...item,
              item: { ...item.item, qty: item.item.qty },
            })
          : null;
        return null;
      });
  }, [Cart.cartDetails, products.productDetails]);

  const handleCartItem = (pindex) => {
    if (userDetails.sub) {
      let temp = { item_id: products.productDetails.id };
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          item: { ...temp, qty: 1 },
          accessToken: localStorage.getItem("token"),
        })
      );
      // setButtonLoading(true);
    } else {
      dispatch(showLogin());
    }
  };

  const onIncrement = () => {
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

  const onDecrement = () => {
    if (ExistingProduct.item.qty == 1) {
      dispatch(
        deleteCartItem({
          cart_item_id: ExistingProduct.ciid,
          id: Cart?.cartDetails?.items[0]?.id,
          customer_id: userDetails.sub,
        })
      );
      setExistingProduct({ item: { qty: 0 } });
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
  const validateAddToCart = () => {
    // return variants[0]
    // console.log("console.count()", subscription);
    const validateSessionSelection = subscription.filter(
      (subsc) => subsc.is_included
    );
    const startDateSelections = subscription.map(
      (s) => s.order_dates.length === 0 && s.is_included
    );
    const isStartDateValidated = !startDateSelections.includes(true);
    const validateDuration = variants.filter((variant) => variant.items).length;
    let validateAddress = true;
    // validate.forEach((itm) => {
    //   if (itm.isDelivery) {
    //     if (itm.address.aline1 !== "" && itm.address.aline2 !== "") {
    //       validate2 = true;
    //     }
    //     return false;
    //   } else if (!itm.isDelivery) {
    //     validate2 = true;
    //   } else {
    //     return false;
    //   }
    // });

    dispatch(
      setScheduleErrorStatus({
        showDurationError: validateDuration === 0,
        showSessionError: validateSessionSelection.length === 0,
        startDateValidationStatus: startDateSelections,
      })
    );

    if (
      validateSessionSelection.length &&
      validateDuration &&
      isStartDateValidated &&
      validateAddress
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    let temp = 0;
    let tempArr = [];
    let duration = VarItems?.Duration?.duration;

    subscription.map((subscribed) => {
      if (subscribed.is_included) {
        const addonPrice = subscribed?.addon_items?.map(
          (addOn) => addOn.price * addOn.qty
        );
        const { [MEAL_PRICE_TYPES[subscribed.meal_type]]: mealPrice } =
          products.productDetails?.meal_prices;
        subscribed = {
          ...subscribed,
          sale_val: (mealPrice + addonPrice) * duration,
        };
        tempArr.push(subscribed);
        temp = temp + subscribed.sale_val;
      }
    });
    setBreakUps(tempArr);
    setSubscriptionTotal(temp);
  }, [
    VarItems?.Duration?.duration,
    subscription,
    subscription[0].addon_items,
    subscription[1].addon_items,
    subscription[2].addon_items,
  ]);

  const variantsSelected = (varItems) => {
    setVarItems(varItems);
  };

  const updateAddress = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  if (Cart.cartLoading) {
    return (
      <div className="fullscreen-loader">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  console.log("cs_ExistingProduct", ExistingProduct);

  return (
    <FormProvider {...methods}>
      <AddressModal
        customerId={userDetails.sub}
        handleClose={() => setShowModal(false)}
        showModal={showModal}
        updateAddress={updateAddress}
        handleSubmit={handleSubmit(handleCartSubmit)}
      />
      <div className="bg-1 ProductDetailsSection">
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
            zIndex: 999,
            paddingTop: 10,
            boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          {products.productDetails?.is_mealplan && (
            <div className="w-100 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="h6 ff-3">Subscription Amount :</p>
                <p className="h5 ff-2">
                  <BiRupee />
                  {displayCurrency(SubscriptionTotal)}
                </p>
              </div>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between w-100">
            {products.productDetails?.is_mealplan ? (
              <>
                {isOnboarding && (
                  <Button
                    onClick={handleBack}
                    s
                    className="w-50 m-1"
                    variant="secondary"
                    style={{ borderColor: "rgba(54,41,24,0.75)" }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  className={`${
                    isOnboarding
                      ? "w-50 m-1 custom-primary-btn"
                      : "w-100 m-1 custom-primary-btn"
                  }`}
                  style={{
                    width: "100%",
                  }}
                  onClick={() => {
                    handleAddToCart();
                  }}
                >
                  Add to Cart
                </Button>
              </>
            ) : ExistingProduct?.item?.qty ? (
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
                  {Cart.cartLoading || Cart.cartUpdateLoading ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    <GrSubtract />
                  )}
                </Button>
                <FormControl
                  aria-label="Example text with two button addons"
                  style={{
                    textAlign: "center",
                    background: "transparent",
                    borderColor: "rgba(54,41,24,0.75)",
                  }}
                  disabled={true}
                  value={ExistingProduct?.item?.qty || ""}
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
                  {Cart.cartLoading || Cart.cartUpdateLoading ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    <GrAdd />
                  )}
                </Button>
              </InputGroup>
            ) : (
              <Button
                className="m-1 custom-primary-btn"
                style={{
                  width: "100%",
                  height: "3rem",
                }}
                onClick={handleCartItem}
              >
                <AiOutlineShoppingCart />
                {"  "}
                {Cart.cartLoading || Cart.cartUpdateLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  "Add to Cart"
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
