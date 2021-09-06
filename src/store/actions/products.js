import { types } from "../constants";

export const getProductsAction = (payload) => {
  return {
    type: types.PRODUCT_LIST,
    payload
  };
};

export const getProductDetails = (payload) => {
  return {
    type: types.PRODUCT_DETAILS,
    payload: payload,
  };
};


export const searchProducts = (payload) => {
  return {
    type: types.PRODUCT_SEARCH,
    payload: payload,
  };
}