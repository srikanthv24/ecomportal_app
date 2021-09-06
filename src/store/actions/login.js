import { types } from '../constants';

export const loginSuccess = (userDetails) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: userDetails
    }
}

export const clearLoginState = (message) => {
    return {
        type: types.CLEAR_LOGIN_STATE,
        payload: message
    }
}
