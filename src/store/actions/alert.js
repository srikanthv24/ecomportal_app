import { types } from "../constants";

export const showAlert = (payload) => {
  return {
    type: types.SHOW_ALERT,
    payload,
  };
};

export const hideAlert = () => {
  return {
    type: types.HIDE_ALERT,
  };
};

export const autoAlert = (payload) => {
  return {
    type: types.AUTO_ALERT,
    payload,
  };
};
