import { types } from "../constants"

export const getCartItems = (payload) => {
    return {
        type: types.GET_CART_ITEM,
        payload
    }
}

export const addCardItem = (payload) => {
    return {
        type: types.ADD_CART_ITEM,
        payload
    }
}

export const updateCardItem = (payload) => {
    return {
        type: types.UPDATE_CART_ITEM,
        payload
    }
}