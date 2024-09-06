import { getCategories } from "../graphql/mutations";
const PRODUCT_API_URL = process.env.REACT_APP_Product_REL_API_URL;
const PRODUCT_API_KEY = process.env.REACT_APP_Product_REL_API_KEY;
export class Categories {
  static getCategories = async(params) => {
    return fetch(`${PRODUCT_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'X-API-Key': `${PRODUCT_API_KEY}`
      },
      body: JSON.stringify({
        query: getCategories,
        variables: {
          limit: params.payload.limit,
          nextToken: params.payload.nextToken,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

}
