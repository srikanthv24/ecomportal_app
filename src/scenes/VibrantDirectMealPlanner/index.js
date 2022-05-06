import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCartInput } from "../../store/actions/cart";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { PICKUP, ADD_TO_CART } from "../../utils/constants";
import ProductPlanner from "../../components/ProductPlanner/ProductPlanner";
import AddressComponent from "../../components/AddressComponent/AddressComponent";
import { getMealPlanDetails, getOrderDates } from "./vibrantMealPlanner.utils";
import { showLogin } from "../../store/actions";
import { clearDeliveryCharges } from "../../store/actions/addresses";
import { getProductDetails } from "../../store/actions/products";
import "./styles.scss";

const apiKey = "AIzaSyC6YxgAdZtGYuU2Isl9V4eDdbZfwPjAcAs";
let script = document.createElement("script");
const loadScript = (url) => {
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
      }
    };
  } else {
    script.onload = () => null;
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function VibrantDirectMealPlanner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [profileDetails, setProfileDetails] = useState({
    gender: "",
    heightFeet: null,
    heightInch: null,
    weight: null,
    age: null,
  });
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [deliveryType, setDeliveryType] = useState(PICKUP);
  const [selectedDuration, setSelectedDuration] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [mealPlans, setMealPlans] = useState([]);
  const [address, setAddress] = useState({});
  const [delivery, setDelivery] = useState({});
  const [addressSelected, setAddressSelected] = useState(false);
  const {
    display_name,
    category,
    defaultimg_url,
    description,
    meal_prices,
    variants,
    id: productId,
  } = selectedMeal;

  const { mealPlansList: mealList, loading: mealLoading } = useSelector(
    (state) => state.mealPlans
  );
  const products = useSelector((state) => state.products);

  const customerId = useSelector((state) => state?.auth?.userDetails?.sub);

  const onMealProductClick = (meal) => {
    setSelectedMeal(meal);
  };

  const onMealPlanSelection = (duration) => setSelectedDuration(duration);

  const onSessionChange = (sessions) => {
    setSelectedSessions(sessions);
    refreshMealPlans(sessions);
  };

  const refreshMealPlans = (sessions = selectedSessions) => {
    const { delivery_charge, discount } = delivery;
    setMealPlans(
      getMealPlanDetails(
        sessions,
        meal_prices,
        variants[0],
        delivery_charge,
        discount
      )
    );
  };

  const onDeliveryTypeChange = (value) => {
    setDeliveryType(value);
  };

  const onStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const onAddToCart = () => {
    if (!customerId || customerId === "") {
      dispatch(showLogin());
    } else {
      dispatch(
        createCartInput({
          profileDetails,
          deliveryType,
          orderDates: getOrderDates(selectedDuration, selectedStartDate),
          duration: selectedDuration,
          customerId,
          productId,
          selectedSessions,
          address,
        })
      );
      dispatch(clearDeliveryCharges());
      history.push("/cart-summary");
    }
  };

  useEffect(() => {
    if (selectedDuration && selectedSessions.length > 0 && customerId !== "")
      onAddToCart();
  }, [customerId]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    );
    dispatch(getProductDetails(id));
    return () => {
      document.getElementsByTagName("head")[0].removeChild(script);
    };
  }, []);

  useEffect(() => {
    setSelectedMeal(products?.productDetails);
  }, [products?.productDetails])

  useEffect(() => {
    delivery?.delivery_charge && refreshMealPlans();
  }, [delivery]);

  return (
    <section className="planner-container">
      {(deliveryType === PICKUP || addressSelected === true ? (
        <div className="text-center pb-3">
          <ProductPlanner
            productTitle={display_name}
            productCategory={category}
            imageUrl={defaultimg_url}
            productDescription={description}
            mealPlans={mealPlans}
            deliveryType={deliveryType}
            selectedSessions={selectedSessions}
            onSessionChange={onSessionChange}
            onStartDateChange={onStartDateChange}
            onMealPlanSelection={onMealPlanSelection}
            onDeliveryChange={onDeliveryTypeChange}
            setAddressSelected={setAddressSelected}
          />
          <Button            
            className="mt-2 mx-auto vl-custom-btn" style={{maxWidth:"calc(100% - 40px)"}}
            onClick={onAddToCart}
            disabled={!selectedDuration || selectedSessions.length === 0}
          >
            {ADD_TO_CART}
          </Button>
        </div>
      ) : (
        <>
          <AddressComponent
            setAddress={setAddress}
            setDelivery={setDelivery}
            onDeliveryTypeChange={onDeliveryTypeChange}
            setAddressSelected={setAddressSelected}
          />
        </>
      )
      )}
    </section>
  );
}

export default VibrantDirectMealPlanner;
