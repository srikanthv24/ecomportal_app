import { types } from "../constants";

export const setSubscriptionDetails = (payload) => {
  return {
    type: types.SET_SUBSCRIPTION_DETAILS,
    payload,
  };
};
