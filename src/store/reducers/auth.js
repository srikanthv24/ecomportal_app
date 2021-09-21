import { types } from "../constants";

const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null,
    userData: '',
    tokenList: ''
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                userData: action.payload
            }
        case types.AUTH_LOADING:
            return {
                ...state,
               loading:true,
               error:null
            }
        
        case types.AUTH_ERROR:
            return {
                ...state,
                isLoggedIn:false,
                loading: false,
                error: action.payload
            }
        
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                isLoggedIn: true,
                tokenList: action.payload
            }

        default:
            return state;
    }
};