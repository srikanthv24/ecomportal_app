import { types } from '../constants';

const intialState = {
    loading: false,
    userData: '',
    loginError: false
}

export const login = (state = intialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userData: action.payload,
                loginError: false
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                userData: '',
                loginError: true
            }
        case types.CLEAR_LOGIN_STATE:
            return {
                loading: false,
                userData: '',
                loginError: false
            }
        default:
            return state;
    }
}