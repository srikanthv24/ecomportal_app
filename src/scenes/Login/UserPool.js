import { CognitoUserPool } from "amazon-cognito-identity-js";

let server = "dev" ;
export let poolData ={}

if(server == "production" ){
     poolData ={
        UserPoolId:"ap-south-1_2bBWYvNqM",
        ClientId:"6346flpmjrjnlcf88sihvpr4rt"
    }
}else {
    poolData ={
        UserPoolId:"us-east-1_LmIBVgrWX",
        ClientId:"1elqc1ok4eqb1c9sjlhhiq74sd"
    }
}

export default new CognitoUserPool(poolData);