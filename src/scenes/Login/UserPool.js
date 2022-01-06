import { CognitoUserPool } from "amazon-cognito-identity-js";

let server = "dev" ;
 let poolData ={}

if(server == "production" ){
     poolData ={
        UserPoolId:"ap-south-1_M9QZnjTRM",
        ClientId:"4pat50qqnkkpm9aoi05r1hojim"
    }
}else {
    poolData ={
        UserPoolId:"us-east-1_LmIBVgrWX",
        ClientId:"1elqc1ok4eqb1c9sjlhhiq74sd"
    }
}


export default new CognitoUserPool(poolData);