import { SERVICE_TYPE } from "./constants";
import moment from "moment";
import { getDateInTextFormat } from "./dateUtils";

export const isPauseSubscriptionService = (serviceType) => {
  return (
    serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
    serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
    serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
    serviceType === SERVICE_TYPE.PAUSE_CUSTOM
  );
};

export const getSubscriptionConfirmationText = (serviceType, mealType) => {
  if (serviceType === SERVICE_TYPE.PAUSE_TOMORROW) {
    return `You are pausing ${mealType} on ${getDateInTextFormat(
      moment().add(1, "days")
    )}`;
  } else if (serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN) {
    return `Your are pausing ${mealType}`;
  } else if (serviceType === SERVICE_TYPE.PAUSE_INDEFINITE) {
    return `Your are pausing ${mealType} indefinetly`;
  } else if (serviceType === SERVICE_TYPE.RESUME_INDEFINITE) {
    return `Your are resuming ${mealType} indefinetly`;
  }
};
