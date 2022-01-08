import { getCategories } from "../graphql/mutations";
import { api_urls } from "../../utils";


const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_CATLOG_X_API_KEY;


//ca : Product_REL_API_URL
export class Categories {
  static getCategories = async(params) => {
    //const getToken = await sessionStorage.getItem('token')
    return fetch(`${api_urls.Product_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
        //dev = qp52v6iixvh6bdgd2qjdqa3dyq
        //produciton : da2-xclkxhpjbbbxfcyw2vtp3zc64e
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
