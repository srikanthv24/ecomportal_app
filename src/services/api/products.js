import {
  getAddressList,
  getProductDetails,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../graphql/mutations";

const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_CATLOG_X_API_KEY;

export class Products {
  static getProducts = async (params) => {
    try {
      console.log("PARAARARAMS==>", JSON.stringify(params.payload.category));
      // console.log("PARAMSSSS", getProductsByCategory(params));
      return await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
        },
        // body: params.payload ? getProductsByCategory(params) : getProducts(),
        body: JSON.stringify({
          query: getProducts,
          variables: {
            category: params.payload.category,
            limit: params.payload.limit,
            nextToken: params.payload.nextToken,
          },
        }),
      }).then((res) => res.json());
    } catch (error) {
      throw error;
    }
  };

  static ProductDetails = async (id) => {
    console.log("IIIIDDD", id);
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
      },
      body: getProductDetails(id.payload),
    }).then((res) => res.json());
  };

  static productSearch = async (query) => {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
      },
      body: searchProducts(query),
    }).then((res) => res.json());
  };

  static getAddressList = async (id) => {
    return await fetch(
      "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "da2-j7yxgxymtrarzavgivfwda4h5u",
        },
        body: JSON.stringify({
          query: getAddressList,
          variables: {
            customerId: id,
          },
        }),
      }
    ).then((res) => res.json());
  };
}
