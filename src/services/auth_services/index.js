import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import UserPool, { poolData } from "../../scenes/Login/UserPool";
import { getCognitoUser } from "../getCognitoUser";

class AuthService {
  constructor() {
    this.currentUser = UserPool.getCurrentUser();
  }

  forgot(phone) {
    const user = new CognitoUser({
      Username: `+91${phone}`,
      Pool: UserPool,
    });

    return new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: (data) => {
          console.log("OnSuccess:------------>>>>>>>> ", data, data.accessToken);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("onFailure:-------------->>>>>>>>> ", err.message);
          reject(err);
        }
      });
    });
  }

  login(phone, password) {
    const user = new CognitoUser({
      Username: `+91${phone}`,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: `+91${phone}`,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("OnSuccess: ", data, data.accessToken);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("onFailure: ", err.message);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
        },
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (this.currentUser != null) {
        try {
          this.currentUser.signOut();
          resolve("Logged Out Successfully!");
        } catch (error) {
          reject("Error while logging out!");
        }
      }
    });
  }

  registerUser(name, phone, password) {
    return new Promise((resolve, reject) => {
      var attributeList = [];

      var dataPhoneNumber = {
        Name: "phone_number",
        Value: `+91${phone}`,
      };

      var dataName = {
        Name: "name",
        Value: name,
      };

      var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
      var attributeName = new CognitoUserAttribute(dataName);

      attributeList.push(attributePhoneNumber);
      attributeList.push(attributeName);

      UserPool.signUp(
        `+91${phone}`,
        password,
        attributeList,
        null,
        function (error, data) {
          if (data) {
            console.log("succesfully created the user:::", data);

            resolve(data);
          } else {
            console.log("error in registering user:::", error.message);
            reject(error);
          }
        }
      );
    });
  }

  getUserToken() {
    return new Promise((resolve, reject) => {
      let currentUser = UserPool.getCurrentUser();
      if (currentUser !== null) {
        let cognitoUser = getCognitoUser({
          Pool: UserPool,
          Username: currentUser.username,
        });
        cognitoUser.getSession((err, res) => {
          if (res) {
            cognitoUser.refreshSession(res.refreshToken, (error, result) => {
              if (result) {
                localStorage.setItem("token", result.accessToken.jwtToken);
                resolve(result);
              } else {
                reject(error);
              }
            })
          } else {
            reject(err);
          }
        });
      } else {
        reject("No user found");
      }
    })
  }

  getUser() {
    return new Promise((resolve, reject) => {
      let currentUser = UserPool.getCurrentUser();
      console.log("getUser()", currentUser);
      if (currentUser != null) {
        let cognitoUser = getCognitoUser({
          Pool: UserPool,
          Username: currentUser.username,
        });

        cognitoUser.getSession((err, res) => {
          console.log("ERR-RESS", err, res);
        });

        cognitoUser.getUserAttributes((err, result) => {
          let temp = {};
          if (result) {
            result.map((item) => {
              console.log("MyData", item);
              switch (item.Name) {
                case "name":
                  temp.name = item.Value;
                  break;
                case "phone_number":
                  temp.phone_number = item.Value;
                  break;
                case "sub":
                  temp.sub = item.Value;
                  break;
                default:
                  return temp;
              }
            });
            resolve(temp);
          } else {
            reject(err);
          }
        });
      } else {
        reject("No user found");
      }
    });
  }

  refreshToken() {

    return new Promise((resolve, reject) => {
      let currentUser = UserPool.getCurrentUser();
      let cognitoUser = getCognitoUser({
        Pool: UserPool,
        Username: currentUser.username,
      });
  
      cognitoUser.getSession((err, res) => {
        console.log("ERR-RESS", err, res);
        cognitoUser.refreshSession(res.refreshToken, (error, result) => {
          console.log('refreshedToken--->', error, result)
          
          localStorage.setItem("token", result.accessToken.jwtToken);
          resolve(result);
        })
      });
    })
  }
}

export default new AuthService();
