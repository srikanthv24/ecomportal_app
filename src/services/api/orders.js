import { Orders } from "../graphql/mutations";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

//4du - 

export class OrdersApi {
  static getOrders = async(params) => {
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return await fetch(
        `${api_urls.SUB_REL_API_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": getToken,
          },
          body: JSON.stringify({
            query: `{
                listSubscriptions(filter: {status: {eq: "A"},customer_mobile: {eq: ${JSON.stringify(
                  params
                )}}}) {
                  item_count
                  items {
                  id
                  customer {
                    mobile
                    display_name
                  }
                  paid_amount
                  orderscount {
                  meal_type
                  meals_consumed
                  meals_ordered
                  meals_pausedORcancelled
                  meals_remaining
                  }
                  B_balance
                  D_balance
                  L_balance
                  start_date
                  product {
                    display_name
                    category
                  }
                  finish_date,
                  cartitem_id,
                  cart_id
                }
              }
              }`,
          }),
        }
      )
        .then((res) => res.json())
        .catch((error) => console.log("ERROR", error));
    } catch (error) {
      console.log("error", error);
    }
  };
}
