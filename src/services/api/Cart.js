
import {
  CartSummary,
  createCart,
  createCartItem,
  getCart,
  updateCart,
  updateCartItem,
  updateCartQty,
} from "../graphql/mutations";
import { api_urls } from "../../utils";



//m76 : Common_API_URL
export class Cart {
  static getCart= async(params) =>{
    const getToken = await sessionStorage.getItem('token')
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
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

  static getCartSummary = async(params)=> {
    const getToken= await sessionStorage.getItem('token') ;
    console.log("parrrrr",params)
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
           // "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
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

  static createCart=async(params)=> {
    // console.log('PARAQMS', `mutation {
    //   createCart(input: {${params.payload}}) {
    //     id
    //   }
    // }`)
    const getToken = await sessionStorage.getItem('token')
    let payload = params.payload;
    try {
      return fetch(
        `${api_urls.Common_API_URL}`,
        {
          method: "POST",
          headers: {
            "Authorization": getToken,
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
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  static updateCartQty(params) {
    const { id, customer_id, qty, cart_item_id } = params.payload;
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
              ciid : cart_item_id,
              id: id,
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
