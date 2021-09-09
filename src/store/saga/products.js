import { call, put, takeEvery } from "redux-saga/effects";
import { Products } from "../../services/api/products";
import { types } from "../constants";

function* getProducts(params) {
  try {
    const products = yield call(Products.getProducts, params);
    console.log("prodduc", products.data.listItems.items);
    if (products.data) {
      yield put({
        type: types.PRODUCT_LIST_SUCCESS,
        payload: products.data.listItems,
      });
    } else {
      yield put({
        type: types.PRODUCT_LIST_FAILURE,
        payload: [],
      });
    }
  } catch (error) {
    throw error;
  }
}

function* getProductById(id) {
  console.log("IDIDID", id);
  try {
    const productDetails = yield call(() => Products.ProductDetails(id));
    if (productDetails.data) {
      yield put({
        type: types.PRODUCT_DETAILS_SUCCESS,
        payload: productDetails.data.getItem,
      });
    } else {
      yield put({
        type: types.PRODUCT_DETAILS_FAILURE,
        payload: {},
      });
    }
  } catch (error) {
    console.log("ERRORRRR", error);
  }
}

function* SearchProduct(query) {
  try {
    const products = yield call(() => Products.productSearch(query));

    if (products.data) {
      yield put({
        type: types.PRODUCT_SEARCH_SUCCESS,
        payload: products.data.listItems,
      });
    } else {
      yield put({
        type: types.PRODUCT_SEARCH_FAILURE,
        payload: [],
      });
    }
  } catch (error) {
    console.log("ERRORRRR", error);
  }
}

function* getAddresses(params) {
  try {
    const addresses = yield call(Products.getAddressList, params.payload.customerId);
    if (addresses.data) {
      yield put({
        type: types.ADDRESS_LIST_SUCCESS,
        payload: addresses.data,
      });
    }
  } catch (error) {
    yield put({
      type: types.ADDRESS_LIST_FAILURE,
      payload: [],
    });
  }
}

export function* productsSaga() {
  yield takeEvery(types.PRODUCT_DETAILS, getProductById);
  yield takeEvery(types.PRODUCT_LIST, getProducts);
  yield takeEvery(types.PRODUCT_SEARCH, SearchProduct);
  yield takeEvery(types.ADDRESS_LIST, getAddresses);
}
