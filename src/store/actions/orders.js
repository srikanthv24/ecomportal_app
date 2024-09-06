import { types } from "../constants";

export const getOrders = (payload) => {
  return {
    type: types.GET_ORDER,
    payload,
  };
};
