import { types} from '../constants'

export const saveMealPlanId = (id) => {
    console.log("meal plan action:::", id);
    return {
        type: types.MEAL_PLAN_ID,
        id
    }
};


export const getMealPlans = () => {
    return {
      type: types.MEALPLANS_LIST
    };
  };

export const getMealPlanDetails = (payload) => {
  return {
    type: types.MEALPLAN_DETAILS,
    payload: payload,
  };
};