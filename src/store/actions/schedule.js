import { types } from "../constants";

export const setScheduleErrorStatus = (payload) => {
  return {
    type: types.SET_ADD_TO_CART_ERROR_STATUS,
    payload: payload,
  };
};

export const updateScheduleErrorStatus = (payload) => {
  return {
    type: types.UPDATE_ADD_TO_CART_ERROR_STATUS,
    payload: payload,
  };
};