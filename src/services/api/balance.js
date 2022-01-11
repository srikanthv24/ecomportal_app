import  {api_urls} from "../../utils"

export class BalanceApi {
    static getCustomerBalance = async(data) => { 
        console.log("inside balance api", data);
        const getToken = await sessionStorage.getItem("token");
        return fetch(`${api_urls.Customer_REL_API_URL}`,{
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
