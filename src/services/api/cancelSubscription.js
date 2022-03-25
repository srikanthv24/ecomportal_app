import { CANCEL_SUBSCRIPTION } from "../../services/graphql/mutations";
import { api_urls } from "../../utils";
 export const cancelSubscriptionApi = async(id) => {
   console.log("cancel sub ID in api: "+ JSON.stringify(id));
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
    console.log("cancel sub api return: "+ JSON.stringify(orders.data));
    return orders.data.cancelSubscription.id;
    }
    catch (error) {
      console.log("error", error);
      return error;
    }
  }