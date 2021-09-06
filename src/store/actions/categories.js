import { types } from '../constants';

export const getCategories = () => {
    return {
        type: types.GET_CATEGORIES,
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