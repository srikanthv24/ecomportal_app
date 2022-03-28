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
  return { errorMessage: "" }
};
