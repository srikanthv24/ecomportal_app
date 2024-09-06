import { RefreshToken } from "../../helpers/refreshSession";
const COMMON_API_URL = process.env.REACT_APP_Common_API_URL;
const DELIVERY_API_URL = process.env.REACT_APP_delivery_calculatio_API_URL;
const POSTAL_API_KEY = process.env.REACT_APP_Postal_API_KEY;

export class Adresses {
  static getAddressList = async (id) => {
    const getToken  = await RefreshToken.getRefreshedToken()
    return await fetch(
      `${COMMON_API_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken,
        },
        body: JSON.stringify({
          query: `{
          listAddresses (filter: {customer_id: {eq: ${JSON.stringify(
            id.customerId
          )}}}) {
          items {   
          customer_id
          aline1
          aline2
          city
          area_code
          customer_name
          community
          landmark
          state
          tag
          id
          postalcode
          }
          }
     }`,
        }),
      }
    ).then((res) => res.json());
  };

  static postAddress = async(data) => {
    const getToken  = await RefreshToken.getRefreshedToken();
    return fetch(
      `${COMMON_API_URL}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
         "Authorization": getToken,
        },
        body: JSON.stringify({
          query: `mutation {
              createAddress(input: {customer_id:"${data.customer_id}",aline1: "${data.aline1}", aline2: "${data.aline2}", city: "${data.city}", customer_name: "${data.customer_name}", community: "${data.community}", landmark: "${data.landmark}", state: "${data.state}", tag: "${data.tag}", postalcode: "${data.postalcode}"}) {
                id
                customer_id

              }
            }
        `,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  static deleteAddress = async(data) => {
    const getToken  = await RefreshToken.getRefreshedToken()
    return fetch(
      `${COMMON_API_URL}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken,
        },
        body: JSON.stringify({
          query: `mutation {
                  deleteAddress(input: {id: "${data.addressId}", customer_name: "${data.customerName}"}) {
                    id
                  }
                }
            `,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  static getPostalCodes = async() => {
    const getToken  = await RefreshToken.getRefreshedToken()
    return fetch(
      `${COMMON_API_URL}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": `${POSTAL_API_KEY}`,
        },
        body: JSON.stringify({
          query: `
                {
                  listPostalCodes{
                    items{
                      id
                      postalcode
                      city
                      state
                    }
                  }
                }
            `,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  static calculateDeliveryCharge = async (data) => {
    const urlParams = new URLSearchParams(Object.entries(data));
    return fetch(`${DELIVERY_API_URL}?${urlParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        return data;
    });
  };
}
