import { types } from "../constants";

export const getCart = (payload) => {
  return {
    type: types.GET_CART,
    payload,
  };
};

export const createCart = (payload) => {
  return {
    type: types.CREATE_CART,
    payload,
  };
};

export const updateCart = (payload) => {
  return {
    type: types.UPDATE_CART,
    payload,
  };
};

export const updateCartQty = (payload) => {
  return {
    type: types.UPDATE_CART_QTY,
    payload,
  };
};

export const getCartSummary = (payload) => {
  return {
    type: types.GET_CART_SUMMARY,
    payload,
  };
};

export const deleteCart = () => {
  return {
    type: types.CREATE_CART_FAILURE,
  };
};
