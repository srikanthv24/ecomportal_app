export const RESUME_SUBSCRIPTION = `mutation($input: PauseSubscriptionInput!){
    pauseSubscription(input: $input){
error
message
customer_name
comment
check
product_name
statusCode
subscription_id
pause_dates {
from_date
to_date
session
}
}
}`;
