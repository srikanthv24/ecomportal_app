import moment from "moment";

export const getMinDateAsToday = () => moment().format("YYYY-MM-DD");

export const getCustomMinDate = () => moment().format("YYYY-MM-DD");

export const getMinDate = (subscriptions) => {
  const startDatesofSessions = subscriptions?.map(
    (subscription) => subscription.order_dates[0]
  );
  // As of now all start dates are same
  return startDatesofSessions[0].date;
};

export const getMaxDate = (subscriptions) => {
  const endDatesofSessions = subscriptions?.map(
    (subscription) =>
      subscription.order_dates[subscription.order_dates.length - 1]
  );
  // As of now all end dates are same
  return endDatesofSessions[0].date;
};

export const getDateInTextFormat = (date) => {
  return moment(new Date(date)).format("MMMM Do, YYYY");
};