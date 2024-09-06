import { RefreshToken } from "../../helpers/refreshSession";
const SUB_API_URL = process.env.REACT_APP_SUB_REL_API_URL;
export class OrdersApi {
  static getOrders = async(params) => {
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return await fetch(
        `${SUB_API_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": getToken,
          },
          body: JSON.stringify({
            query: `{
                listSubscriptions(filter: {status: {eq: "ALL"},customer_mobile: {eq: ${JSON.stringify(
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
                  duration
                  tomorrows_delivery
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
                    id
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
