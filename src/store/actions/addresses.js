import { types } from "../constants";

export const getAddresses = (payload) => {
  return {
    type: types.ADDRESS_LIST,
    payload,
  };
};


export const postAddress = (payload) => {
  return {
    type: types.CREATE_ADDRESS,
    payload
  }
};

export const deleteAddress = (data) => {
  return {
    type: types.DELETE_ADDRESS,
    payload: data
  }
}


export const getPostalCodes = () => {
  return {
    type: types.GET_POSTALCODES
  };
};