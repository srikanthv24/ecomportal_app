export const RESUME_SUBSCRIPTION = `mutation($subscription_id:Int!) {
    resumeSubscription(input: {subscription_id: $subscription_id}) {
    dates
    }
    }`;
