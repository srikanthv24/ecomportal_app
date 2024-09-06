import { PAUSE_SUBSCRIPTION } from "../graphql/pauseSubscriptionMutation";
import { RefreshToken } from "../../helpers/refreshSession";
const SUB_API_URL = process.env.REACT_APP_SUB_REL_API_URL;

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
    const response = await fetch(`${SUB_API_URL}`, {
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
