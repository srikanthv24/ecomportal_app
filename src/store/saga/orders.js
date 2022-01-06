import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { OrdersApi } from "../../services/api/orders";
import { types } from "../constants";

function* GetOrders(params) {
  const response = yield call(OrdersApi.getOrders, params);
  console.log("Response-Orders", response);
  if (response) {
    yield put({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data.listSubscriptions,
    });
  } else {
    yield put({
      type: types.GET_ORDER_FAILURE,
      payload: response,
    });
  }
}

export function* OrdersSaga() {
  yield all([takeLatest(types.GET_ORDER, GetOrders)]);
}
