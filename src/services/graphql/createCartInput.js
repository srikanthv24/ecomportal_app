export const CREATE_CART_INPUT = `mutation($input:CreateCartInput!){
    createCart(input: $input) {
        id
        customer_id
      }
    }`;
