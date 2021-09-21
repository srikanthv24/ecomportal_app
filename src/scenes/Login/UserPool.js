import { CognitoUserPool } from "amazon-cognito-identity-js";

// const poolData ={
//     UserPoolId:"us-east-2_ZNrhHsuqD",
//     ClientId:"7j2k46sf7dvtep3am7d0v7t87n"
// }

const poolData ={
    UserPoolId:"us-east-1_LmIBVgrWX",
    ClientId: '1elqc1ok4eqb1c9sjlhhiq74sd'
    // ClientId:"6q6vj7100vmj9tr5s4jrp5cv8i"
}

export default new CognitoUserPool(poolData);