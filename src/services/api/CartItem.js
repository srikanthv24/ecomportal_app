import {
  createCartItem,
  deleteCartItem,
  getCartItemSchema,
  updateCartItem,
} from "../graphql/mutations";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export class CartItem {
  static getCartItem =async (params)=> {
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
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
      // console.log(error);
    }
  }

  static createCartItem= async(params) => {
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
          },
          body: JSON.stringify({
            query: createCartItem(params.payload.sub_data),
            variables: {
              item: params.payload.item,
              cart: params.payload.cart,
              qty: Number(params.payload.qty),
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      // console.log(error);
    }
  }

  static updateCartItem=async(params) =>{
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
          },
          body: JSON.stringify({
            query: updateCartItem,
            variables: {
              cartItemId: params.payload.productId,
              qty: params.payload.qty,
              sub_data: JSON.stringify(params.payload.sub_data),
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {
      // console.log(error);
    }
  }

  static deleteCartItem  = async (params)=> {
    const getToken = await RefreshToken.getRefreshedToken()
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
          },
          body: JSON.stringify({
            query: deleteCartItem,
            variables: {
              ciid: params.payload.cart_item_id,
              id: params.payload.id,
            },
          }),
        }
      ).then((res) => res.json());
    } catch (error) {}
  }
}
