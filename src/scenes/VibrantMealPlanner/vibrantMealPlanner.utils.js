import { MEAL_PRICE_TYPES } from "../../utils/constants";
import moment from "moment";

export const getMealPlanDetails = (
  selectedSessions,
  meal_prices,
  durationVariant,
  deliveryCharge = 0,
  addonPrice = 0,
  totalTaxes = 0
) => {
  if (selectedSessions.length === 0) return [];

  const mealPlans = [
    ...durationVariant.items,
    { duration: 30, canChangeDuration: true },
  ].map((item) => {
    const { duration, canChangeDuration } = item;
    const pricePerDay = selectedSessions
      .map((session) => {
        const { [MEAL_PRICE_TYPES[session]]: mealPrice } = meal_prices;
        return mealPrice + addonPrice + deliveryCharge + totalTaxes;
      })
      .reduce((a, b) => a + b, 0);

    return {
      pricePerDay: pricePerDay,
      servings: selectedSessions.length * duration,
      duration,
      canChangeDuration: canChangeDuration,
    };
  });
  return mealPlans;
};

export const getOrderDates = (duration, startDate) => {
  let orderDates = [];
  for (let i = 0; i < duration; i++) {
    orderDates.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
  }
  console.log("orderDates: " + JSON.stringify(orderDates));
  return orderDates;
};
