import { types } from "../constants";

// export const loginSuccess = (userDetails) => {
//     return {
//         type: types.LOGIN_SUCCESS,
//         payload: userDetails
//     }
// }

export const clearLoginState = (message) => {
  return {
    type: types.CLEAR_LOGIN_STATE,
    payload: message,
  };
};

export const showLogin = () => {
  return {
    type: types.SHOW_LOGIN_MODAL,
  };
};

export const hideLogin = () => {
  return {
    type: types.HIDE_LOGIN_MODAL,
  };
};
