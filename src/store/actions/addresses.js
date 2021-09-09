import { types } from "../constants";

export const getAddresses = (payload) => {
  return {
    type: types.ADDRESS_LIST,
    payload,
  };
};
