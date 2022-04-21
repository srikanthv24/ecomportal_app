import { types } from "../constants";

export const getMealPlans = () => {
  return {
    type: types.MEALPLANS_LIST,
  };
};
