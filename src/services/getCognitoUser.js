import { CognitoUser } from "amazon-cognito-identity-js";

export const getCognitoUser = (userdata) => {
  return new CognitoUser(userdata);
};
