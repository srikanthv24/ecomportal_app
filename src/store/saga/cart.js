import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Cart } from "../../services/api/Cart";
import { createCart } from "../actions/cart";
import { types } from "../constants";

function* GetCart(params) {
  try {
    const response = yield call(Cart.getCart, params);
    
    if (!response.data.queryCartsByCustomerIndex.items.length) {
      yield put(
        createCart({
          customerId: params.payload,
          qty: 0,
          upd_by: "",
          upd_on: "",
        })
      );
      yield put({
        type: types.GET_CART_SUCCESS,
        payload: response.data.queryCartsByCustomerIndex.items[0],
      });
    } else {
      yield put({
        type: types.GET_CART_SUCCESS,
        payload: response.data.queryCartsByCustomerIndex.items[0],
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CART_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}
function* CreateCart(params) {
  try {
    const response = yield call(Cart.createCart, params);
    console.log("CartItemCreated", response);
    yield put({
      type: types.CREATE_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_CART_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

function* UpdateCart(params) {
  try {
    const response = yield call(Cart.updateCart, params);
    console.log("CartItemUpdated", response);
    yield put({
      type: types.UPDATE_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

export function* CartSaga() {
  yield takeEvery(types.CREATE_CART, CreateCart);
  yield takeEvery(types.UPDATE_CART, UpdateCart);
  yield takeLatest(types.GET_CART, GetCart);
}
