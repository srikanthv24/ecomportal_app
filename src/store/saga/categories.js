import { types } from '../constants';
import { Categories } from '../../services/api';
import { all, takeLatest, put, call } from 'redux-saga/effects';

function* categories(params) {
    const response = yield call(Categories.getCategories, params);
    if (response) {
        if (response.data && response.data.listItemCategories && response.data.listItemCategories.items) {
            yield put({
                type: types.GET_CATEGORIES_SUCCESS,
                payload: response.data.listItemCategories.items
            });
        } else {
            yield put({
                type: types.GET_CATEGORIES_FAILURE,
                payload: true
            });
        }
    }
}

function* createCategory(action) {
    const response = yield call(Categories.createCategory, action.payload);
    if (response) {
        if (response.data && response.data.createItemCategory && !response.errors) {
            yield put({
                type: types.CREATE_CATEGORY_SUCCESS,
                payload: response.data.createItemCategory
            });
        } else if (response.errors) {
            yield put({
                type: types.CREATE_CATEGORY_FAILURE,
                payload: true
            });
        }
    }
}

export function* categoriesSaga() {
    yield all([
        takeLatest(types.GET_CATEGORIES, categories),
        takeLatest(types.CREATE_CATEGORY, createCategory)
    ])
    // yield takeLatest(types.GET_CATEGORIES, categories)
}