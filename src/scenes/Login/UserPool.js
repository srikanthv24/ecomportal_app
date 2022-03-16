import { CognitoUserPool } from "amazon-cognito-identity-js";

let server = "development" ;
export let poolData ={}

if(server == "production" ){
     poolData ={
        UserPoolId:"ap-south-1_dTkI9Ztc5",
        ClientId:"2tuua9a609jrh9puhportsvs7c"
    }
}else {
    poolData ={
        UserPoolId:"us-east-1_LmIBVgrWX",
        ClientId:"1elqc1ok4eqb1c9sjlhhiq74sd"
    }
}

export default new CognitoUserPool(poolData);