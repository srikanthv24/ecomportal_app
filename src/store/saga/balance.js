import { call, put, takeLatest } from "@redux-saga/core/effects";
import { BalanceApi } from "../../services/api";
import { types } from "../constants";

function* Balance(action) {
  try {
    const { data, errors } = yield call(
      BalanceApi.getCustomerBalance,
      action.payload
    );
    if (data) {
      yield put({
        type: types.GET_BALANCE_SUCCESS,
        payload: data,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_BALANCE_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_BALANCE_FAILURE,
      payload: error,
    });
  }
}

export function* balanceSaga() {
  yield takeLatest(types.GET_BALANCE, Balance);
}
