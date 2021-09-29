import { types } from "../constants";

export const signupSuccess = (userData) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: userData,
  };
};

export const authLoading = () => {
  return {
    type: types.AUTH_LOADING,
  };
};

export const authError = (error) => {
  return {
    type: types.AUTH_ERROR,
    payload: error,
  };
};

export const loginSuccess = (tokenList) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: tokenList,
  };
};

export const getTokenSucces = () => {
  return {
    type: types.GET_SESSION_TOKEN_SUCCESS,
  };
};

export const getTokenFailure = () => {
  return {
    type: types.GET_SESSION_TOKEN_FAILURE,
  };
};

export const updateUserDetails = (payload) => {
  return {
    type: types.UPDATE_USER_DETAILS,
    payload,
  };
};
