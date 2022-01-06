import { types } from "../constants";

const initialState = {
  showAlert: false,
  alertMessage: { title: "SJHDKJDH", body: "" },
  variant: "success",
};

export const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      console.log("AlertReducer==>", action);
      return {
        ...state,
        showAlert: true,
        alertMessage: {
          body: action.payload.message,
          title: action.payload.title,
        },
        variant: action.payload.variant,
      };
    case types.HIDE_ALERT:
      return { ...state, showAlert: false, alertMessage: {} };
    default:
      return state;
  }
};
