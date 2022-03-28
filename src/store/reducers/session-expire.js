import {types} from '../constants';

const initialState = {
    showModal: false,
    errors: [],
}

export const sessionExpireReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SESSION_EXPIRED:
            return {
                ...state,
                showModal: true,
                errors: action.payload,
            }
        case types.SESSION_MODAL_CLOSE:
            return {
                ...state,
                showModal: false,
                errors: [],
            }
        default:
            return state;
    }
}