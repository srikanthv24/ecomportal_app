import { types } from "../constants";

const initialState = {
  showAlert: false,
  alertMessage: "",
  variant: "success",
};

export const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload.message,
        variant: action.payload.variant,
      };
    case types.HIDE_ALERT:
      return { ...state, showAlert: false, alertMessage: "" };
    default:
      return state;
  }
};
