import { SERVICE_TYPE } from "../../utils/constants";
import { getDateInTextFormat } from "../../utils/dateUtils";

export const getSubscriptionErrorData = (errorData) => {
  const { statusCode } = errorData;
  if (statusCode === 404 || statusCode === 400) {
    return {
      errorMessage: "You have no deliveries on selected day/days.",
    };
  }
  if (Array.isArray(errorData)) {
    return { errorMessage: errorData[0].message };
  }
  return { errorMessage: "" };
};

export const isPauseSubscriptionService = (serviceType) => {
  return (
    serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
    serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
    serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
    serviceType === SERVICE_TYPE.PAUSE_CUSTOM
  );
};

export const getServicedDates = (fromDate, toDate, serviceType) => {
  return serviceType === SERVICE_TYPE.PAUSE_TOMORROW
    ? `${getDateInTextFormat(fromDate)}`
    : `${getDateInTextFormat(fromDate)} to ${getDateInTextFormat(toDate)}`;
};
