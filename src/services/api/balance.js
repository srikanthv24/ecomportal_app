import { RefreshToken } from "../../helpers/refreshSession";
const CUSTOMER_API_URL =  process.env.REACT_APP_Customer_REL_API_URL;

export class BalanceApi {
    static getCustomerBalance = async(data) => { 
        const getToken  = await RefreshToken.getRefreshedToken();
        return fetch(`${CUSTOMER_API_URL}`,{
          method  : "post",
          headers : {
            "Content-Type" : "application/json" ,
            "Authorization": getToken,
           },
            body :  JSON.stringify({
                query : `{
                    getCustomerBalance(customer_id: "${data.customerId}") {
                    amount
                    }
                    }`
             })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            return data
        })
    }
}
