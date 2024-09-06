import { types } from "../constants";

const intialState = {
  loading: false,
  error: false,
  mealPlansList: [],
};

export const mealPlansReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.MEALPLANS_LIST:
      return {
        ...state,
        loading: true,
      };
    case types.MEALPLANS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        mealPlansList: action.payload,
      };
    case types.MEALPLANS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        mealPlansList: [],
      };
    default:
      return state;
  }
};
