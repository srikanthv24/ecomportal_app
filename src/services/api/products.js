import {
  getProductDetails,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../graphql/mutations";

const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_CATLOG_X_API_KEY;

export class Products {
  static getProducts = async (params) => {
    console.log("PARAMSSSS", params);
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
      },
      body: params.payload ? getProductsByCategory(params) : getProducts(),
    }).then((res) => res.json());
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
    }).then(res => res.json());
  };
}
