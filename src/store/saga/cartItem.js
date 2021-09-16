import { call, put, takeEvery } from "redux-saga/effects";
import { Cart } from "../../services/api/Cart";
import { CartItem } from "../../services/api/CartItem";
import { getCart } from "../actions/cart";
import { getCartItems } from "../actions/cart-item";
import { types } from "../constants";

function* getCartItem(params) {
  try {
    yield call(Cart.getCart, {
      payload: "1d3a8d5c-ce41-45d1-80bd-6befa6c46f84",
    });
    const response = yield call(CartItem.getCartItem, params);
    console.log("CartItemCreated", response);
    yield put({
      type: types.GET_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_CART_ITEM_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

function* CreateCartItem(params) {
  try {
    const response = yield call(CartItem.createCartItem, params);
    console.log("CartItemCreated", response);
    yield put(getCartItems({ cartId: response.data.createCartItem.cart }));
    yield put({
      type: types.ADD_CART_ITEM_SUCCESS,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: types.ADD_CART_ITEM_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

function* UpdateCartItem(params) {
  try {
    const response = yield call(CartItem.updateCartItem, params);
    console.log("CartItemCreated", response);
    yield put(getCartItems({ cartId: response.data.updateCartItem.cart }));
    yield put({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_ITEM_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

export function* CartItemSaga() {
  yield takeEvery(types.ADD_CART_ITEM, CreateCartItem);
  yield takeEvery(types.UPDATE_CART_ITEM, UpdateCartItem);
  yield takeEvery(types.GET_CART_ITEM, getCartItem);
}
