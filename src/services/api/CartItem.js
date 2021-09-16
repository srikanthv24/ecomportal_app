import { createCartItem, getCartItemSchema, updateCartItem } from "../graphql/mutations";

export class CartItem {
  
  
    static getCartItem(params) {
        try {
          return fetch(
            "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
            {
              method: "POST",
              headers: {
                "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
              },
              body: JSON.stringify({
                query: getCartItemSchema,
                variables: {
                  cartId: params.payload.cartId,
                },
              }),
            }
          ).then((res) => res.json());
        } catch (error) {
          console.log(error);
        }
      }
  
  
    static createCartItem(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: createCartItem,
            variables: {
              item: params.payload.item,
              cart: params.payload.cart,
              qty: Number(params.payload.qty),
              sub_data: JSON.stringify(params.payload.sub_data)
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static updateCartItem(params) {
    try {
      return fetch(
        "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
          },
          body: JSON.stringify({
            query: updateCartItem,
            variables: {
              cartItemId: params.payload.productId,
              qty: params.payload.qty,
              sub_data: JSON.stringify(params.payload.sub_data)
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }
}
