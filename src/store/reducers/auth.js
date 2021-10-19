import { types } from "../constants";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  cognitoUserDetails: "",
  tokenList: "",
  userDetails: {
    name: "",
    phone_number: "",
    sub: "",
  },
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        // isLoggedIn: true,
        loading: false,
        //cognitoUserDetails: action.payload
      };
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        tokenList: action.payload,
      };
    case types.GET_SESSION_TOKEN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    case types.GET_SESSION_TOKEN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };

    case "CLEAR_USER_DETAILS":
      return {
        ...state,
        userDetails: {
          name: "",
          phone_number: "",
          sub: "",
        },
      };
    case types.UPDATE_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload },
      };

    default:
      return state;
  }
};
