import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolId = process.env.REACT_APP_USERPOOLID;
const ClientId = process.env.REACT_APP_CLIENTID;


const poolData ={
    UserPoolId: UserPoolId,
    ClientId: ClientId
}

export default new CognitoUserPool(poolData);