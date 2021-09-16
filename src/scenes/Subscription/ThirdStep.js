import React, { useEffect, useState } from 'react';
//import ProductDetails from "../SecondStep/product-details";
import { useSelector } from 'react-redux';
import MealPlanDetails from './product-view';

function ThirdStep({handleNextStep, handleBack}) {
    const mealPlanId = useSelector(state => state.mealPlans.mealPlanId);

    console.log("Meal plan Idddddddddd from state", mealPlanId);
    
    return <MealPlanDetails id={mealPlanId} handleNextStep={handleNextStep} handleBack={handleBack} />
};

export default ThirdStep;