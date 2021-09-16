import {
  createCart,
  createCartItem,
  getCart,
  updateCart,
  updateCartItem,
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
              customerId: params.payload,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static createCart(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: createCart,
            variables: {
              customerId: params.payload.customerId,
              qty: params.payload.qty,
              upd_by: params.payload.upd_by,
              upd_on: params.payload.upd_on,
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
            query: updateCart,
            variables: {
              id: params.payload.cartId,
              qty: params.payload.qty,
              
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }
}
