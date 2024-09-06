import { call, put, takeLatest } from "@redux-saga/core/effects";
import { OrdersApi } from "../../services/api/orders";
import { types } from "../constants";

function* GetOrders(params) {
  try {
    const { data, errors } = yield call(
      OrdersApi.getOrders,
      params.payload.customer_number
    );
    if (data) {
      yield put({
        type: types.GET_ORDER_SUCCESS,
        payload: data.listSubscriptions.items,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_ORDER_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_ORDER_FAILURE,
      payload: error,
    });
  }
}

export function* OrdersSaga() {
  yield takeLatest(types.GET_ORDER, GetOrders);
}
