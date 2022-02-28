import { call, put, takeEvery, all, takeLatest } from "redux-saga/effects";
//import { Products } from "../../services/api/products";
import { types } from "../constants";
import { mealPlans } from '../../services/api/mealPlans';


function* getMealPlans() {
    try {
      const response = yield call(() => mealPlans.getMealPlans());
      console.log("meal plans saga", response.data.listItems.items);
      if (response.data) {
        yield put({
          type: types.MEALPLANS_LIST_SUCCESS,
          payload: response.data.listItems.items,
        });
      } else {
        yield put({
          type: types.MEALPLANS_LIST_FAILURE,
          payload: [],
        });
      }
    } catch (error) {}
  }

function* getMealPlanById(action) {
  console.log("view mealplan by id saga action", action);
  try {
    const response = yield call(mealPlans.mealPlanDetails, action.payload);
    if (response.data) {
      yield put({
        type: types.MEALPLAN_DETAILS_SUCCESS,
        payload: response.data.getItem,
      });
    } else {
      yield put({
        type: types.MEALPLAN_DETAILS_FAILURE,
        payload: {},
      });
    }
  } catch (error) {
    yield put({
      type: types.MEALPLAN_DETAILS_FAILURE,
      payload: error
    });
  }
}

export function* mealPlansSaga() {
    yield all([
    yield takeEvery(types.MEALPLANS_LIST, getMealPlans),
    yield takeLatest(types.MEALPLAN_DETAILS, getMealPlanById),
    ])
  }