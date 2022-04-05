import { types } from "../constants";

const initialState = {
  ciid: "",
  customer_id: "",
  customer_mobile: "",
  customer_name: "",
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUBSCIPTION_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
