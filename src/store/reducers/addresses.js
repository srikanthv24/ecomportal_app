import { types } from "../constants";

const initialState = {
  addressList: [],
};

export const Addresses = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDRESS_LIST_SUCCESS:
      return { ...state, addressList: action.payload };

    case types.ADDRESS_LIST_FAILURE:
      return { ...state, addressList: [] };

    default:
      return state;
  }
};
