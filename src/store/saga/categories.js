import { types } from "../constants";
import { Categories } from "../../services/api";
import { all, takeLatest, put, call } from "redux-saga/effects";

function* categories(params) {
  try {
    const { data, errors } = yield call(Categories.getCategories, params);
    if (data && data.listItemCategories && data.listItemCategories.items) {
      yield put({
        type: types.GET_CATEGORIES_SUCCESS,
        payload: data.listItemCategories.items,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_CATEGORIES_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CATEGORIES_FAILURE,
      payload: error,
    });
  }
}

function* createCategory(action) {
  try {
    const { data, errors } = yield call(
      Categories.createCategory,
      action.payload
    );
    if (data && data.createItemCategory) {
      yield put({
        type: types.CREATE_CATEGORY_SUCCESS,
        payload: data.createItemCategory,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.CREATE_CATEGORY_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.CREATE_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* categoriesSaga() {
  yield all([
    takeLatest(types.GET_CATEGORIES, categories),
    takeLatest(types.CREATE_CATEGORY, createCategory),
  ]);
}
