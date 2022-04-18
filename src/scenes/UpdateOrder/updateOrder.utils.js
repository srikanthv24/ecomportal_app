import { CART } from "../../utils/constants";

export const getDataForUpdateCartApi = (
  updatedOrders,
  userDetails,
  subscription,
  selectedSessions,
  duration
) => {
  const { sub, name, phone_number } = userDetails;
  const { subscription_id, item, ciid, id } = subscription;
  const {
    is_mealplan,
    qty,
    subscription: subscriptionData,
    item_id,
    item_name,
  } = item;
  return {
    customer_id: sub,
    customer_mobile: phone_number,
    customer_name: name,
    subscription_id: subscription_id,
    id,
    ciid,
    item: {
      item_id,
      item_name,
      is_mealplan,
      qty,
      subscription: selectedSessions.map((session, index) => {
        return {
          addon_items: [],
          address:
            subscriptionData && subscriptionData[index].isDelivery
              ? subscriptionData[index].address
              : {},
          isDelivery: subscriptionData[index].isDelivery,
          meal_type: subscriptionData[index].meal_type,
          order_dates: updatedOrders[index],
        };
      }),
      variants: [
        {
          display_name: CART.DURATION,
          items: [
            {
              display_name: `${duration} Days`,
            },
          ],
        },
      ],
    },
  };
};

export const getDatesByStatus = (orderDates, sessionIndex, statusCode) => {
  return orderDates?.length > 0
    ? orderDates[sessionIndex]
        .filter((dateObject) => dateObject.status === statusCode)
        .map((dateObject) => dateObject.date)
    : [];
};
