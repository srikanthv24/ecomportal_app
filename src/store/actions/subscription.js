import { types } from "../constants";

export const setSubscriptionDetails = (payload) => {
  return {
    type: types.SET_SUBSCRIPTION_DETAILS,
    payload,
  };
};

export const getSubscriptionDetails = (payload) => {
  return {
    type: types.SUBSCRIPTION_DETAILS,
    payload,
  };
};

export const updateSubscriptionDetails = (payload) => {
  return {
    type: types.UPDATE_SUBSCRIPTION,
    payload,
  };
};
