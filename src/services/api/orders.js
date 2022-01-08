import { Orders } from "../graphql/mutations";
import { api_urls } from "../../utils";

//4du - SUB_REL_API_URL
export class OrdersApi {
  static getOrders = (params) => {
    console.log("params.payload.cutomer_mobile", params);
    try {
      return fetch(
        "https://4du5xi23jneq5gmwctl2vl42ty.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "da2-ob4lwer67nc2rbnury6cxczx4i",
          },
          body: JSON.stringify({
            query: `{
                listSubscriptions(filter: {customer_mobile: {eq: ${JSON.stringify(
                  params.payload.customer_number
                )}}}) {
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
                  finish_date
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
