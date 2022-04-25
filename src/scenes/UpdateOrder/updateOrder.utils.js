import { CART, ISO_FORMAT } from "../../utils/constants";
import moment from "moment";

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

export const getFirstSubscriptionDate = (orderDates) => {
  const allDates = orderDates?.reduce((result, sessionDates) => {
    const dates = sessionDates.map((dateWithStatus) => dateWithStatus.date);
    return [...result, ...dates];
  }, []);
  return allDates?.sort((date1, date2) => {
    const previousDateinMilliSecs = new Date(date1).getTime();
    const currentDateinMilliSecs = new Date(date2).getTime();
    return previousDateinMilliSecs - currentDateinMilliSecs;
  })[0];
};

export const getGracePeriod = (grace, subscriptionStartDate) => {
  return moment(subscriptionStartDate).add(grace-1, "days").format(ISO_FORMAT);
};

export const addressFormatter = (jsonData) => {
  const {aline1 ,aline2 ,city ,community ,landmark ,state ,tag ,postalcode } = jsonData;
    return `#${aline1}, ${aline2}, ${landmark}, ${community}, ${city}, ${state}, ${postalcode}`;
}
