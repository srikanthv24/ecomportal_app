import { types } from "../constants";

const initialState = {
  ordersList: [],
  isLoading: false,
};

export const Orders = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDER:
      return { ...state, isLoading: true };

    case types.GET_ORDER_SUCCESS:
      return { ...state, isLoading: false, ordersList: action.payload };

    case types.GET_ORDER_FAILURE:
      return { ...state, isLoading: false, ordersList: [] };

    default:
      return state;
  }
};
