import { getCategories } from "../graphql/mutations";
import { api_urls } from "../../utils";
const API_KEY = process.env.REACT_APP_CATEGORY_KEY;

export class Categories {
  static getCategories = async(params) => {
    return fetch(`${api_urls.Product_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": `${API_KEY}`,
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

  static createCategory = async(data) => {
    const getToken = await sessionStorage.getItem('token')
    let date = new Date();
    return fetch(`${api_urls.Product_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `mutation {
                    createItemCategory(input:{name: "${
                      data.name
                    }",display_name: "${data.display_name}",status: "${
          data.status
        }",upd_by: "${data.upd_by}",upd_on: "${date.toISOString()}"}) {
                      id
                      display_name
                      name
                      status
                      upd_by
                      upd_on
                    }
                }  
            `,
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
