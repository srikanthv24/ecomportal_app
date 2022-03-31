import { getCategories } from "../graphql/mutations";
import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";

export class Categories {
  static getCategories = async(params) => {
    return fetch(`${api_urls.Product_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'X-API-Key': `${api_urls.Product_REL_API_KEY}`
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
