import { types } from "../constants";

export const getAddresses = (payload) => {
  return {
    type: types.ADDRESS_LIST,
    payload,
  };
};


export const postAddress = (payload) => {
  console.log("post address action is called:::", payload);
  return {
    type: types.CREATE_ADDRESS,
    payload
  }
};

// export const deleteAddress = (payload) => {
//   console.log("post address action is called:::", payload);
//   return {
//     type: types.CREATE_ADDRESS,
//     payload
//   }
// }


export const getPostalCodes = () => {
  return {
    type: types.GET_POSTALCODES
  };
};