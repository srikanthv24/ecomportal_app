import { types } from "../constants";

const initialState = {
  loading: false,
  subscription: {},
  error: false
};

export const Subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBSCRIPTION_DETAILS:
      return {
        ...state,
        loading: true
      };
    case types.SUBSCRIPTION_DETAILS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        subscription: action.payload
      };
    case types.SUBSCRIPTION_DETAILS_FAILURE:
      return { 
        ...state, 
        loading: false,
        error: true,
        subscription: {}
      };
    case types.UPDATE_SUBSCRIPTION:
      return {
        ...state,
        loading: true
      };
    case types.UPDATE_SUBSCRIPTION_SUCCESS:
      return { 
        ...state, 
        loading: false
      };
    case types.UPDATE_SUBSCRIPTION_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: true
      };
    default:
      return state;
  }
};
