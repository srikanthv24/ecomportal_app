import { types } from '../constants';
import { Customer } from '../../services/api';
import { all, takeLatest, put, call } from 'redux-saga/effects';

function* gender() {
    const response = yield call(Customer.getGender);
    if (response) {
        if (response.data) {
            yield put({
                type: types.GET_CUST_GENDER_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.GET_CUST_GENDER_FAILURE,
                payload: true
            });
        }
    }
}

function* activity() {
    const response = yield call(Customer.getPhysicalActivity);
    if (response) {
        if (response.data) {
            yield put({
                type: types.GET_CUST_ACTIVITY_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.GET_CUST_ACTIVITY_FAILURE,
                payload: true
            });
        }
    }
}

function* diet() {
    const response = yield call(Customer.getDietPreference);
    if (response) {
        if (response.data) {
            yield put({
                type: types.GET_CUST_DIET_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.GET_CUST_DIET_FAILURE,
                payload: true
            });
        }
    }
}

function* goal() {
    const response = yield call(Customer.getGoalList);
    if (response) {
        if (response.data) {
            yield put({
                type: types.GET_CUST_GOAL_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.GET_CUST_GOAL_FAILURE,
                payload: true
            });
        }
    }
}
    

function* postCustomerData(action) {
    const response = yield call(Customer.createCustomer, action.payload);
    console.log("response from saga:::", response);
    if (response) {
        if (response.data) {
            yield put({
                type: types.POST_CUST_DATA_SUCCESS,
                payload: response.data.createCustomer.id
            });
        } else {
            yield put({
                type: types.POST_CUST_DATA_FAILURE,
                payload: response.errors
            });
        }
    }
}



export function* customerSaga() {
    yield all([
        takeLatest(types.GET_CUST_GENDER, gender),
        takeLatest(types.GET_CUST_ACTIVITY, activity),
        takeLatest(types.GET_CUST_DIET, diet),
        takeLatest(types.GET_CUST_GOAL, goal),
        takeLatest(types.POST_CUST_DATA, postCustomerData),
    ])
}