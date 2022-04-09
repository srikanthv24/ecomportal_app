export const UPDATE_ORDER_INPUT = `mutation($input:EditSubscriptionInput!){
  consumerEditSubscription(input: $input) {
      id
      customer_id
    }
  }`;
