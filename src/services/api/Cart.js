
import {
  CartSummary,
  createCart,
  createCartItem,
  getCart,
  updateCart,
  updateCartItem,
  updateCartQty,
} from "../graphql/mutations";

export class Cart {
  static getCart(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: getCart,
            variables: {
              customer_id: params.payload.customer_id,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static getCartSummary(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: CartSummary,
          variables: { 
              customer_id: params.payload.customer_id,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {}
  }

  static createCart(params) {
    // console.log('PARAQMS', `mutation {
    //   createCart(input: {${params.payload}}) {
    //     id
    //   }
    // }`)
    let payload = params.payload;
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: `mutation ($input: CreateCartInput!){
              createCart(input: $input) {
                id
                customer_id
              }
            }`,
            variables: {
              input: {
                ...payload,
              },
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static updateCart(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: `mutation ($cart_id: ID!, $customer_id: ID!, $item: UpdateCartItemInput!) {
              updateCart(input: {cart_id: $cart_id, customer_id: $customer_id, item: $item}) {
                id
                customer_id
              }
            }`,
            variables: {
              cart_id: params.payload.cart_id,
              customer_id: params.payload.customer_id,
              item: params.payload.item,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static updateCartQty(params) {
    const { id, customer_id, item_id, qty, cart_item_id } = params.payload;
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: updateCartQty,
            variables: {
              cart_item_id,
              cart_id: id,
              item_id,
              qty,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log("<===UpdateCartQtyFailed===>", error);
    }
  }
}
