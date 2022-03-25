import { CANCEL_SUBSCRIPTION } from "../../services/graphql/mutations";
import { api_urls } from "../../utils";
 export const cancelSubscriptionApi = async(id) => {
    const getToken = await sessionStorage.getItem('token')
    try {
    const response = await fetch(
      `${api_urls.SUB_REL_API_URL}`,
      {
        method: "POST",
        headers: {
          "Authorization": getToken,
        },
        body: JSON.stringify({
          query: CANCEL_SUBSCRIPTION,
          variables: {
            id: id
          },
        }),
      }
    );
    const orders = await response.json();
    return orders.data.cancelSubscription.id;
    }
    catch (error) {
      return error;
    }
  }