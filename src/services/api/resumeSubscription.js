import { RESUME_SUBSCRIPTION } from "../graphql/resumeSubscriptionMutation";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export const resumeSubscription = async (
  check,
  sub_id,
  comments,
  resume_dates
) => {
  const getToken = await RefreshToken.getRefreshedToken();
  try {
    const response = await fetch(`${api_urls.SUB_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken,
      },
      body: JSON.stringify({
        query: RESUME_SUBSCRIPTION,
        variables: {
          subscription_id: parseInt(sub_id),
        },
      }),
    });
    const pauseResponse = await response.json();
    return pauseResponse;
  } catch (error) {
    return error;
  }
};
