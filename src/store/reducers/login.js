import { types } from "../constants";

const initialState = {
  isLoggedIn: false,
};

export const Login = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOGIN_MODAL:
      return { ...state, isLoggedIn: true };
    case types.HIDE_LOGIN_MODAL:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
