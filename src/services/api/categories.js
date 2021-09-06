const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_CATLOG_X_API_KEY;

export class Categories {
    static getCategories = () => {
        return fetch(`${API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'da2-orjjngnz3ffc3jjnn75bfm4roi'
            },
            body: JSON.stringify({
                query: `
            {
              listItemCategories(limit: 10) {
              items {
              display_name
              id
              name
              status
              upd_by
              upd_on
               }
               }
              }  
            `})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }

    static createCategory = (data) => {
        let date = new Date();
        return fetch(`${API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            },
            body: JSON.stringify({
                query: `mutation {
                    createItemCategory(input:{name: "${data.name}",display_name: "${data.display_name}",status: "${data.status}",upd_by: "${data.upd_by}",upd_on: "${date.toISOString()}"}) {
                      id
                      display_name
                      name
                      status
                      upd_by
                      upd_on
                    }
                }  
            `})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data
        })
    }
}