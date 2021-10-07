import { toast } from "react-toastify";
import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { Cart } from "../../services/api/Cart";
import { createCart, getCart } from "../actions/cart";
import { types } from "../constants";

function* GetCart(params) {
  try {
    const response = yield call(Cart.getCart, params);
    console.log("<=GETCART=>", response);

    // if (!response.data.queryCartsByCustomerIndex.items.length) {
    //   yield put(
    //     createCart({
    //       customerId: params.payload,
    //       qty: 0,
    //       upd_by: "",
    //       upd_on: "",
    //     })
    //   );
    //   yield put({
    //     type: types.GET_CART_SUCCESS,
    //     payload: response.data.queryCartsByCustomerIndex.items,
    //   });
    // } else {
    // }
    yield put({
      type: types.GET_CART_SUCCESS,
      payload: response.data.queryCartsByCustomerIndex,
    });
  } catch (error) {
    yield put({
      type: types.GET_CART_FAILURE,
      payload: [],
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
    if (response.data.updateCart == null) {
      toast("Failed Adding to cart, please try again!", {
        type: "error",
        theme: "dark",
        position: 'bottom-center'
      });
    } else {
      yield put(getCart({ customer_id: response.data.updateCart.customer_id }));
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_CART_FAILURE,
      payload: {},
    });
    console.log(error);
  }
}

function* updateCartQty(params) {
  try {
    const response = yield call(Cart.updateCartQty, params);
    const state = yield select();
    console.log("UPDATE_CART_QTY_RESPONSE==>", response);
    yield put(getCart({ customer_id: state.auth.userDetails.sub }));
  } catch (error) {
    console.log("<==UpdateCartQtyFailed==>", error);
  }
}

function* getCartSummary(params) {
  try {
    const response = yield call(Cart.getCartSummary, params);
    yield put({
      type: types.GET_CART_SUMMARY_SUCCESS,
      payload: response.data.queryCartsByCustomerIndex,
    });
  } catch (error) {
    yield put({
      type: types.GET_CART_SUMMARY_FAILURE,
      payload: [],
    });
    console.log(error);
  }
}

export function* CartSaga() {
  yield takeEvery(types.CREATE_CART, CreateCart);
  yield takeEvery(types.UPDATE_CART, UpdateCart);
  yield takeLatest(types.GET_CART, GetCart);
  yield takeEvery(types.UPDATE_CART_QTY, updateCartQty);
  yield takeEvery(types.GET_CART_SUMMARY, getCartSummary);
}
