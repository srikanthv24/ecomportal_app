import { types } from '../constants';

export const getCategories = (payload) => {
    return {
        type: types.GET_CATEGORIES,
        payload
    }
}

export const createCategory = (categorydata) => {
    return {
        type: types.CREATE_CATEGORY,
        payload: categorydata
    }
}

export const clearCategoryState = () => {
    return {
        type: types.CLEAR_CATEGORY_STATE
    }
}