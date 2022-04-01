import { types } from "../constants";

const initialState = {
  errorStatus: {
    showDurationError: false,
    showSessionError: false,
    startDateValidationStatus: [false, false, false],
  },
};

export const schedule = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ADD_TO_CART_ERROR_STATUS:
      return { ...state, errorStatus: action.payload };
    case types.UPDATE_ADD_TO_CART_ERROR_STATUS:
      const { errorStatus } = state;
      return { ...state, errorStatus: { ...errorStatus, ...action.payload } };
    default:
      return state;
  }
};