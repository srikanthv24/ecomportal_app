import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MealPlanDetails from './product-view';

function ThirdStep({handleNextStep, handleBack}) {    
    return <MealPlanDetails handleNextStep={handleNextStep} handleBack={handleBack} />
};

export default ThirdStep;