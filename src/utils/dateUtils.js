import moment from "moment";
import { INDIAN_DATE_FORMAT, ISO_FORMAT } from "./constants";

export const getMinDateAsToday = () => moment().format(ISO_FORMAT);

export const getCustomMinDate = () => moment().format(ISO_FORMAT);

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
  return moment(date).format("MMMM Do, YYYY");
};

export const getDateInIndianFormat = (date) => {
  return moment(date).format(INDIAN_DATE_FORMAT);
};

export const getDateInISOformat = (date) => {
  return moment(date, INDIAN_DATE_FORMAT).format(ISO_FORMAT);
};

export const getTomorrowDate = () => {
  return moment().add(1, "days").format(ISO_FORMAT);
};

export const getTodayDate = () => {
  return moment().format(ISO_FORMAT);
}

export const getMax60Days = () => {
  return moment().add(60, "days").format(ISO_FORMAT);
}

export const getTomorrowDateIndianFormat = () => {
  return moment().add(1, "days").format(INDIAN_DATE_FORMAT);
}
