import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductDetails from "../Products/product-details";

const PlannerWrapper = ({ handleBack }) => {
  const mealPlanId = useSelector((state) => state.mealPlans);
  const addToCartHandler = useRef(null)

  return (
    <div>
      <ProductDetails productId={mealPlanId.mealPlanId} isOnboarding={true} myRef={addToCartHandler} />
      <div className="d-flex mt-2">
        <Button onClick={handleBack} className="w-50 m-1" variant="secondary">
          Back
        </Button>
        <Button className="w-50 m-1" variant="primary" onClick={() => addToCartHandler.current()} >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PlannerWrapper;
