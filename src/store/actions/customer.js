import { types } from '../constants';

export const getGender = () => {
    return {
        type: types.GET_CUST_GENDER
    }
}

export const getPhysicalActivity = () => {
    return {
        type: types.GET_CUST_ACTIVITY,
    }
}

export const getDietPreference = () => {
    return {
        type: types.GET_CUST_DIET,
    }
}

export const getGoalList = () => {
    return {
        type: types.GET_CUST_GOAL,
    }
}

export const createCustomer = (payload) => {
    return {
        type: types.POST_CUST_DATA,
        payload
    }
} 

export const saveUserData = (payload) => {
    return {
        type: types.SAVE_USER_DATA,
        payload
    }
} 
