import { SERVICE_TYPE } from "./constants";

export const isPauseSubscriptionService = (serviceType) => {
    return (
      serviceType === SERVICE_TYPE.PAUSE_INDEFINITE ||
      serviceType === SERVICE_TYPE.PAUSE_TOMORROW ||
      serviceType === SERVICE_TYPE.PAUSE_IN_BETWEEN ||
      serviceType === SERVICE_TYPE.PAUSE_CUSTOM
    );
  };