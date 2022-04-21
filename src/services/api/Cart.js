import {
  CartSummary,
  createCart,
  cartItemsCount,
  getCart,
  updateCartQty,
} from "../graphql/mutations";
import { RefreshToken } from "../../helpers/refreshSession";
const COMMON_API_URL = process.env.REACT_APP_Common_API_URL;

export class Cart {
  static getCart = async (params) => {
    const getToken = await RefreshToken.getRefreshedToken();
    try {
      return fetch(`${COMMON_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: getToken,
        },
        body: JSON.stringify({
          query: getCart,
          variables: {
            customer_id: params.payload.customer_id,
          },
        }),
      }).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  static getCartItemsCount = async (data) => {
    const { customer_id } = data;
    const getToken = await RefreshToken.getRefreshedToken();
    try {
      return fetch(`${COMMON_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: getToken,
        },
        body: JSON.stringify({
          query: cartItemsCount,
          variables: {
            customer_id: customer_id,
          },
        }),
      }).then((res) => res.json());
    } catch (error) {}
  };

  static createCart = async (params) => {
    const getToken = await RefreshToken.getRefreshedToken();
    let payload = params.payload;
    try {
      return fetch(`${COMMON_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: getToken,
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
      }).then((res) => res.json());
    } catch (error) {
      // console.log(error);
    }
  };

  static updateCart = async (params) => {
    const getToken = await RefreshToken.getRefreshedToken();
    try {
      return fetch(`${COMMON_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: getToken,
        },
        body: JSON.stringify({
          query: `mutation ($id: ID!,$ciid: ID!, $customer_id: ID!, $item: UpdateCartItemInput!) {
              updateCart(input: {id: $id, ciid: $ciid, customer_id: $customer_id, item: $item}) {
                id
                customer_id
              }
            }`,
          variables: {
            // cart_id: params.payload.cart_id,
            id: params.payload.id,
            ciid: params.payload.ciid,
            customer_id: params.payload.customer_id,
            item: params.payload.item,
          },
        }),
      }).then((res) => res.json());
    } catch (error) {
      // console.log(error);
    }
  };

  static updateCartQty = async (params) => {
    const getToken = await RefreshToken.getRefreshedToken();
    const { id, customer_id, qty, cart_item_id } = params.payload;
    try {
      return fetch(`${COMMON_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: getToken,
        },
        body: JSON.stringify({
          query: updateCartQty,
          variables: {
            ciid: cart_item_id,
            id: id,
            qty,
          },
        }),
      }).then((res) => res.json());
    } catch (error) {
      // console.log("<===UpdateCartQtyFailed===>", error);
    }
  };
}
