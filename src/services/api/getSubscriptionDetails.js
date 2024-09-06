import { GET_SUBSCRIPTION } from "../graphql/getSubscriptionQuery";
import { RefreshToken } from "../../helpers/refreshSession";
import { UPDATE_ORDER_INPUT } from "../graphql/updateOrderInput";
const COMMON_API_URL = process.env.REACT_APP_Common_API_URL;

export const getSubscriptionDetails = async (cart_id, cartitem_id, sub_id) => {
  const getToken = await RefreshToken.getRefreshedToken();
  try {
    const response = await fetch(`${COMMON_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: GET_SUBSCRIPTION,
        variables: {
          cart_id: cart_id,
          cartitem_id: cartitem_id,
          sub_id: sub_id,
        },
      }),
    });
    const { data, errors } = await response.json();
    return data.getSubscriptionDetails
      ? { subscriptionDetails: data.getSubscriptionDetails }
      : { error: errors[0] };
  } catch (error) {
    return error;
  }
};

export const updateSubscriptionDetails = async (params) => {
  const getToken = await RefreshToken.getRefreshedToken();
  try {
    const response = await fetch(`${COMMON_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: UPDATE_ORDER_INPUT,
        variables: {
          input: params,
        },
      }),
    });
    const { data, errors } = await response.json();
    return data ? data : { errors: errors };
  } catch (error) {
    return error;
  }
};
