import { SERVICE_TYPE } from "../../utils/constants";

export const getPauseSubscriptionErrorData = (errorData) => {
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

export const isPauseSubscription = (serviceType) => {
  console.log("service type: " + JSON.stringify(serviceType));
  return (
    serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
    serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
    serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
    serviceType === SERVICE_TYPE.PAUSE_CUSTOM
  );
};

export const getServicedDates = (servicedData, serviceType) => {
  return serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
    serviceType === SERVICE_TYPE.PAUSE_INDEFINITE
    ? `${servicedData.fromDate}`
    : `${servicedData.fromDate} to ${servicedData.toDate}`;
};
