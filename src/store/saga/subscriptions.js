import { call, put, all, takeLatest } from "redux-saga/effects";
import { types } from "../constants";
import {
  getSubscriptionDetails,
  updateSubscriptionDetails,
} from "../../services/api/getSubscriptionDetails";

function* getSubscription(action) {
  try {
    const { subscriptionDetails: data, error: errors } = yield call(() =>
      getSubscriptionDetails(
        action.payload.cid,
        action.payload.ciid,
        action.payload.sid
      )
    );
    if (data) {
      yield put({
        type: types.SUBSCRIPTION_DETAILS_SUCCESS,
        payload: data,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.SUBSCRIPTION_DETAILS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.SUBSCRIPTION_DETAILS_FAILURE,
      payload: error,
    });
  }
}

function* updateSubscription(action) {
  try {
    const { consumerEditSubscription, errors } = yield call(
      updateSubscriptionDetails,
      action.payload
    );
    if (consumerEditSubscription.id) {
      yield put({
        type: types.GET_ORDER,
        payload: {
          customer_number: consumerEditSubscription.customer_mobile,
        },
      });
      yield put({
        type: types.UPDATE_SUBSCRIPTION_SUCCESS,
        payload: consumerEditSubscription.id,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.UPDATE_SUBSCRIPTION_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_SUBSCRIPTION_FAILURE,
      payload: error,
    });
  }
}

export function* subscriptionsSaga() {
  yield all([
    yield takeLatest(types.SUBSCRIPTION_DETAILS, getSubscription),
    yield takeLatest(types.UPDATE_SUBSCRIPTION, updateSubscription),
  ]);
}
