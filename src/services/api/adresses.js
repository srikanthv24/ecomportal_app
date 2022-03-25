import { api_urls } from "../../utils";

export class Adresses {
  static getAddressList = async (id) => {
    const getToken  = await sessionStorage.getItem('token')
    return await fetch(
      `${api_urls.Common_API_URL}`,
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
    const getToken  = await sessionStorage.getItem('token');
    return fetch(
      `${api_urls.Common_API_URL}`,
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
    const getToken  = await sessionStorage.getItem('token')
    return fetch(
      `${api_urls.Common_API_URL}`,
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
    const getToken  = await sessionStorage.getItem('token')
    return fetch(
      `${api_urls.Common_API_URL}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "da2-j7yxgxymtrarzavgivfwda4h5u",
        },
        body: JSON.stringify({
          query: `
                {
                  listPostalCodes{
                    items{
                      id
                      postalcode
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
}
