import { call, put, takeEvery, all, takeLatest } from "redux-saga/effects";
import { types } from "../constants";
import { mealPlans } from "../../services/api/mealPlans";

function* getMealPlans() {
  try {
    const { data, errors } = yield call(() => mealPlans.getMealPlans());
    if (data) {
      yield put({
        type: types.MEALPLANS_LIST_SUCCESS,
        payload: data.listItems.items,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.MEALPLANS_LIST_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.MEALPLANS_LIST_FAILURE,
      payload: error,
    });
  }
}

function* getMealPlanById(action) {
  try {
    const { data, errors } = yield call(
      mealPlans.mealPlanDetails,
      action.payload
    );
    if (data) {
      yield put({
        type: types.MEALPLAN_DETAILS_SUCCESS,
        payload: data.getItem,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.MEALPLAN_DETAILS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.MEALPLAN_DETAILS_FAILURE,
      payload: error,
    });
  }
}

export function* mealPlansSaga() {
  yield all([
    yield takeEvery(types.MEALPLANS_LIST, getMealPlans),
    yield takeLatest(types.MEALPLAN_DETAILS, getMealPlanById),
  ]);
}
