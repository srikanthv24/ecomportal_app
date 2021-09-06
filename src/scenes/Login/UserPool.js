import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId:"us-east-2_ZNrhHsuqD",
    ClientId:"7j2k46sf7dvtep3am7d0v7t87n"
}

export default new CognitoUserPool(poolData);