import { toast } from "react-toastify";
import { call, put, takeEvery, select, takeLatest } from "redux-saga/effects";
import { Cart } from "../../services/api/Cart";
import { createCartInput } from "../../services/api/createCartInput";
import { getCartItemsCount } from "../../services/api/getCartItemsCount";
import {
  createCart,
  getCart,
  getCartSummary as getCartSummaryAction,
} from "../actions/cart";
import { types } from "../constants";
import {} from "./";

function* GetCart(params) {
  try {
    const { data, errors } = yield call(Cart.getCart, params);
    if (data) {
      yield put({
        type: types.GET_CART_SUCCESS,
        payload: data.listCarts,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_CART_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CART_FAILURE,
      payload: error,
    });
  }
}
function* CreateCart(params) {
  try {
    const { data, errors } = yield call(Cart.createCart, params);
    if (data) {
      yield put({
        type: types.CREATE_CART_SUCCESS,
        payload: data,
      });
      yield put({
        type: types.GET_CART,
        payload: { customer_id: data.createCart.customer_id },
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.CREATE_CART_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.CREATE_CART_FAILURE,
      payload: error,
    });
  }
}

function* UpdateCart(params) {
  try {
    const { data, errors } = yield call(Cart.updateCart, params);

    if (data.updateCart == null) {
      toast("Failed Adding to cart, please try again!", {
        type: "error",
        theme: "dark",
        position: "bottom-center",
      });
    } else {
      yield put(getCart({ customer_id: data.updateCart.customer_id }));
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_FAILURE,
      payload: error,
    });
  }
}

function* updateCartQty(params) {
  try {
    const { data, errors } = yield call(Cart.updateCartQty, params);
    if (data) {
      yield put({
        type: types.UPDATE_CART_QTY_SUCCESS,
        payload: data,
      });
      const state = yield select();
      yield put(getCart({ customer_id: state.auth.userDetails.sub }));
    } else {
      yield put({
        type: types.UPDATE_CART_QTY_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_QTY_FAILURE,
      payload: error,
    });
  }
}

function* getCartSummary(params) {
  try {
    const { data, errors } = yield call(Cart.getCartSummary, params);
    if (data) {
      yield put({
        type: types.GET_CART_SUMMARY_SUCCESS,
        payload: data.listCarts,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_CART_SUMMARY_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CART_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

function* callCreateCartInputApi(payload) {
  const { customer_id } = yield call(createCartInput, payload);
  if (customer_id) {
    //yield call(getCartItemsCount, customer_id);
  }
}

export function* CartSaga() {
  yield takeLatest(types.CREATE_CART, CreateCart);
  yield takeLatest(types.UPDATE_CART, UpdateCart);
  yield takeLatest(types.GET_CART, GetCart);
  yield takeLatest(types.UPDATE_CART_QTY, updateCartQty);
  yield takeLatest(types.GET_CART_SUMMARY, getCartSummary);
  yield takeLatest(types.CREATE_CART_INPUT, callCreateCartInputApi);
}
