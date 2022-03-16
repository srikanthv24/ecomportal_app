import { call, put, takeEvery } from "redux-saga/effects";
import { Cart } from "../../services/api/Cart";
import { CartItem } from "../../services/api/CartItem";
import { types } from "../constants";

function* getCartItem(params) {
  try {
    yield call(Cart.getCart, {
      payload: "1d3a8d5c-ce41-45d1-80bd-6befa6c46f84",
    });
    const response = yield call(CartItem.getCartItem, params);
    // console.log("CartItemCreated", response);
    yield put({
      type: types.GET_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_CART_ITEM_FAILURE,
      payload: {},
    });
  }
}

function* CreateCartItem(params) {
  try {
    const response = yield call(CartItem.createCartItem, params);
    // console.log("CartItemCreated", response);

    yield put({
      type: types.ADD_CART_ITEM_SUCCESS,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: types.ADD_CART_ITEM_FAILURE,
      payload: {},
    });
  }
}

function* UpdateCartItem(params) {
  try {
    const response = yield call(CartItem.updateCartItem, params);
    // console.log("CartItemCreated", response);

    yield put({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_ITEM_FAILURE,
      payload: {},
    });
  }
}

function* DeleteCartItem(params) {
  try {
    const response = yield call(CartItem.deleteCartItem, params);
    if (response.data) {
      yield put({
        type: types.DELETE_CART_ITEM_SUCCESS,
        payload: response,
      });
      yield put({
        type: types.GET_CART_SUMMARY,
        payload: params.payload,
      });
      yield put({
        type: types.GET_CART,
        payload: params.payload,
      });
    } else if (
      response.errors &&
      response.errors[0]?.errorType === "UnauthorizedException"
    ) {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: response.errors,
      });
    } else {
      yield put({
        type: types.DELETE_CART_ITEM_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_CART_ITEM_FAILURE,
      payload: error,
    });
  }
}

export function* CartItemSaga() {
  yield takeEvery(types.ADD_CART_ITEM, CreateCartItem);
  yield takeEvery(types.UPDATE_CART_ITEM, UpdateCartItem);
  yield takeEvery(types.GET_CART_ITEM, getCartItem);
  yield takeEvery(types.DELETE_CART_ITEM, DeleteCartItem);
}
