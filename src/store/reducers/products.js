import { types } from "../constants";

const initialState = {
  productList: [],
  productDetails: {},
  searchResults: [],
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_LIST_SUCCESS:
      return { ...state, productList: action.payload };

    case types.PRODUCT_LIST_FAILURE:
      return { ...state, productList: [] };

    case types.PRODUCT_DETAILS_SUCCESS:
      return { ...state, productDetails: action.payload };

    case types.PRODUCT_DETAILS_FAILURE:
      return { ...state, productDetails: {} };

    case types.PRODUCT_SEARCH_SUCCESS:
      return { ...state, searchResults: action.payload };

    case types.PRODUCT_SEARCH_FAILURE:
      return { ...state, searchResults: [] };

    default:
      return state;
  }
};
