import { GET_SUBSCRIPTION } from "../graphql/getSubscriptionQuery";
import { api_urls, DUMMY_URL, Common_API_URL1 } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

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
    const subscriptionDetails = await response.json();
    return subscriptionDetails.data.getSubscriptionDetails;
  } catch (error) {
    return error;
  }
};
