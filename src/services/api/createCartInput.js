import { CREATE_CART_INPUT } from "../graphql/createCartInput";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export const createCartInput = async ({ payload }) => {
  const getToken = await RefreshToken.getRefreshedToken();
  const {
    profileDetails,
    deliveryType,
    orderDates,
    duration,
    customerId,
    productId,
    selectedSessions,
    address
  } = payload;
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
      variants: [
        {
          display_name: "Duration",
          items: {
            display_name: `${duration} days`,
          },
        },
      ],
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
        query: CREATE_CART_INPUT,
        variables: {
          input: cartData,
        },
      }),
    });
    const { data, errors } = await response.json();
    return data.createCart ? data.createCart : { error: errors[0] };
  } catch (error) {
    return error;
  }
};
