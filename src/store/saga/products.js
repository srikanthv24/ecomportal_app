import { call, put, takeEvery } from "redux-saga/effects";
import { Products } from "../../services/api/products";
import { types } from "../constants";

function* getProducts(params) {
  try {
    const { data, errors } = yield call(Products.getProducts, params);
    if (data) {
      yield put({
        type: types.PRODUCT_LIST_SUCCESS,
        payload:
          params.payload.category === "Staples"
            ? data.listItemCategories
            : data.listItems,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.PRODUCT_LIST_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.PRODUCT_LIST_FAILURE,
      payload: error,
    });
  }
}

function* getProductById(id) {
  try {
    const { data, errors } = yield call(() => Products.ProductDetails(id));
    if (data) {
      yield put({
        type: types.PRODUCT_DETAILS_SUCCESS,
        payload: data.getItem,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.PRODUCT_DETAILS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.PRODUCT_DETAILS_FAILURE,
      payload: error,
    });
  }
}

function* SearchProduct(query) {
  try {
    const { data, errors } = yield call(() => Products.productSearch(query));
    if (data) {
      yield put({
        type: types.PRODUCT_SEARCH_SUCCESS,
        payload: data.listItems,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.PRODUCT_SEARCH_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.PRODUCT_SEARCH_FAILURE,
      payload: error,
    });
  }
}

function* getAddresses(params) {
  try {
    const { data, errors } = yield call(
      Products.getAddressList,
      params.payload.customerId
    );
    if (data) {
      yield put({
        type: types.ADDRESS_LIST_SUCCESS,
        payload: data,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.ADDRESS_LIST_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.ADDRESS_LIST_FAILURE,
      payload: error,
    });
  }
}

function* getAddons(action) {
  try {
    const { data, errors } = yield call(Products.getAddons, action.payload);
    if (data && data.listItems && data.listItems.items) {
      yield put({
        type: types.GET_ADDONS_SUCCESS,
        payload: data.listItems.items,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_ADDONS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_ADDONS_FAILURE,
      payload: error,
    });
  }
}

export function* productsSaga() {
  yield takeEvery(types.GET_ADDONS, getAddons);
  yield takeEvery(types.PRODUCT_LIST, getProducts);
  yield takeEvery(types.ADDRESS_LIST, getAddresses);
  yield takeEvery(types.PRODUCT_SEARCH, SearchProduct);
  yield takeEvery(types.PRODUCT_DETAILS, getProductById);
}
