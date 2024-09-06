import { CANCEL_SUBSCRIPTION } from "../../services/graphql/mutations";
import { RefreshToken } from "../../helpers/refreshSession";
const SUB_API_URL = process.env.REACT_APP_SUB_REL_API_URL;

 export const cancelSubscriptionApi = async(id) => {
  const getToken = await RefreshToken.getRefreshedToken();
    try {
    const response = await fetch(
      `${SUB_API_URL}`,
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