import { GET_CART_ITEMS_COUNT } from "../graphql/getCartItemsCount";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export const getCartItemsCount = async (customerId) => {
  const getToken = await RefreshToken.getRefreshedToken();
  try {
    const response = await fetch(`${api_urls.Common_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: GET_CART_ITEMS_COUNT,
        variables: {
          customer_id: customerId,
        },
      }),
    });
    const { data, error } = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
