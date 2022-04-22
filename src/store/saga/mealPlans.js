import { call, put, takeLatest } from "redux-saga/effects";
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

export function* mealPlansSaga() {
  yield takeLatest(types.MEALPLANS_LIST, getMealPlans);
}
