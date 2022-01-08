import { api_urls } from "../../utils";


const API_URL =
  "https://rd7pbwckwvb2lgexcirzcswalu.appsync-api.us-east-1.amazonaws.com/graphql/";
const API_KEY = "da2-ikrgaao25re4pflusa3hijenoi";
//const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_CATLOG_X_API_KEY;


//rd7 - Customer_REL_API_URL
export class Customer {
  static getGender = async () => {
     const getToken = await sessionStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `
            {
                __type(name:"Gender"){
                  name
                  enumValues{
                    name
                  }
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

  static getPhysicalActivity = async () => {
    const getToken = await sessionStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `
              {
                __type(name:"Physicalactivity"){
                  name
                  enumValues{
                    name
                  }
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

  static getDietPreference = async () => {
    const getToken = await sessionStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `
              {
                __type(name:"DietPreference"){
                  name
                  enumValues{
                    name
                  }
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

  static getGoalList = async () => {
    const getToken = await sessionStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `
              {
                __type(name:"Goal"){
                  name
                  enumValues{
                    name
                  }
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

  static createCustomer = async(data) => {
    console.log("data to fetch call::::", data);
    const getToken = await sessionStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `mutation {
                  createCustomer(input: {address: "Jublihills", 
                                        dietpreference: ${data.dietpreference}, 
                                        display_name: "${data.name}", 
                                        dob: "16-12-1996", 
                                        goal: ${data.goal}, 
                                        name: "${data.name}", 
                                        mobile: "9550163323", 
                                        physicalactivity: ${data.physicalactivity}, 
                                        upd_by:"${data.name}",
                                        personalinfo: {age: ${data.age}, 
                                                      gender: ${data.gender}, 
                                                      heightcm: ${data.height}, 
                                                      weightkg: ${data.weight}}}) 
                  {
                    id
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
