import { PAUSE_SUBSCRIPTION } from "../graphql/pauseSubscriptionMutation";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export const pauseSubscription = async (
  check,
  subscription_id,
  comments,
  pause_dates
) => {
  const getToken = await RefreshToken.getRefreshedToken();
  const input = {
    comment: comments,
    check: check,
    subscription_id: subscription_id,
    pause_dates: pause_dates,
  };
  try {
    const response = await fetch(`${api_urls.SUB_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: PAUSE_SUBSCRIPTION,
        variables: {
          input: input,
        },
      }),
    });
    const pauseResponse = await response.json();
    return pauseResponse;
  } catch (error) {
    return error;
  }
};
