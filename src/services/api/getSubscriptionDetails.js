import { GET_SUBSCRIPTION } from "../graphql/getSubscriptionQuery";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";
import { UPDATE_ORDER_INPUT } from "../graphql/updateOrderInput";

export const getSubscriptionDetails = async (cart_id, cartitem_id, sub_id) => {
  const getToken = await RefreshToken.getRefreshedToken();
  try {
    //Common_API_URL
    const response = await fetch(`${api_urls.Common_API_URL}`, {
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
  const {
    profileDetails,
    deliveryType,
    orderDates,
    variants,
    customerId,
    productId,
    selectedSessions,
    address
  } = params;
  const { age, gender, heightFeet, heightInch, weight } = profileDetails;
  const cartData = {
    customer_id: customerId,
    personalinfo: {
      age: age,
      gender: gender,
      heightft: {
        feet: heightFeet,
        inch: heightInch,
      },
      weightkg: weight,
    },
    item: {
      item_id: productId,
      qty: 1,
      subscription: selectedSessions.map((session) => {
        return {
          address: address,
          addon_items: [],
          isDelivery: deliveryType === "Delivery",
          meal_type: session,
          notes: "",
          order_dates: orderDates,
        };
      }),
      variants: variants,
    },
  };

  try {
    const response = await fetch(`${api_urls.Common_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: UPDATE_ORDER_INPUT,
        variables: {
          input: cartData,
        },
      }),
    });
    const { data, errors } = await response.json();
    return data.consumerEditSubscription ? data.consumerEditSubscription : { error: errors[0] };
  } catch (error) {
    return error;
  }
};
