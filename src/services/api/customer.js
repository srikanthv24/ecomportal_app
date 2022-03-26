import { api_urls } from "../../utils";

export class Customer {
  static getGender = async () => {
     const getToken = await localStorage.getItem('token')
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
    const getToken = await localStorage.getItem('token')
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
    const getToken = await localStorage.getItem('token')
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
    const getToken = await localStorage.getItem('token')
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
    const getToken = await localStorage.getItem('token')
    return  fetch(`${api_urls.Customer_REL_API_URL}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken,
      },
      body: JSON.stringify({
        query: `mutation {
                  createCustomer(input: 
                    {
                      display_name: "${data.name}",
                      goal: ${data.goal},
                      id: "${data.id}",
                      mobile: "${data.mobile}", 
                      personalinfo: {
                        age: ${data.age}, 
                        gender: ${data.gender}, 
                        heightft: {
                          feet: ${data.heightFeet}, 
                          inch: ${data.heightInches}
                        }, 
                        weightkg: ${data.weight}
                      }, 
                    }) 
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
