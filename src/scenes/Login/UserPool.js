import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId:"us-east-1_LmIBVgrWX",
    ClientId: '1elqc1ok4eqb1c9sjlhhiq74sd'
}

export default new CognitoUserPool(poolData);