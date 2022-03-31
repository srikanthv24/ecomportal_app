export const RESUME_SUBSCRIPTION = `mutation($sub_id:Int!) {
    resumeSubscription(input: {sub_id: $sub_id}) {
    dates
    }
    }`;
