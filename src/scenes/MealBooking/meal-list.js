import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { MealCard } from "./meal-card";
import { useEffect } from "react";
import { getMealPlans } from "../../store/actions/mealPlans";
import CustomSpinner from "../../components/CustomSpinner";

export const MealList = ({handleNextStep}) => {
  const dispatch = useDispatch();
  const mealPlans = useSelector( state => state.mealPlans);
  const [items, setItems] = useState([]);
   
  useEffect(() => {
    dispatch(getMealPlans());
  }, []);

  useEffect(() => {
    if(mealPlans && mealPlans?.mealPlansList?.length > 0){
        setItems(mealPlans.mealPlansList);
    }
  }, [mealPlans.mealPlansList]);

  if(mealPlans.loading) {
    return <CustomSpinner overlay={false} />
  }
  if (items.length === 0 && !mealPlans.loading) {
    return <h3 className="text-center my-4">No Meal Plans Found!!</h3>;
  }

  console.log("meal plan items",items);

  return (
    <>
     <Row xs={12} className="m-0 p-1">
     {items.length &&
        items.map((item) => {
          return item && (
            <Col lg={3} md={3} xs={6} key={item.id} className="m-0 p-1">
              <MealCard product={item} handleNextStep={handleNextStep} />
            </Col>
          );
        })}
     </Row>
    </>
  );
};

