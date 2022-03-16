import { all, call, put, takeEvery } from "redux-saga/effects";
import { Adresses } from "../../services/api/adresses";
import { types } from "../constants";

function* getAddresses(action) {
  try {
    const { data, errors } = yield call(
      Adresses.getAddressList,
      action.payload
    );
    if (data) {
      yield put({
        type: types.ADDRESS_LIST_SUCCESS,
        payload: data,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.ADDRESS_LIST_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.ADDRESS_LIST_FAILURE,
      payload: error,
    });
  }
}

function* postAddress(action) {
  try {
    const { data, errors } = yield call(Adresses.postAddress, action.payload);
    if (data) {
      yield put({
        type: types.CREATE_ADDRESS_SUCCESS,
        payload: data,
      });
      // yield put({
      //   type: types.ADDRESS_LIST,
      //   payload: response.data.createAddress,
      // });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.CREATE_ADDRESS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.CREATE_ADDRESS_FAILURE,
      payload: error,
    });
  }
}

function* deleteAddress(action) {
  try {
    const { data, errors } = yield call(Adresses.deleteAddress, action.payload);
    if (data) {
      yield put({
        type: types.DELETE_ADDRESS_SUCCESS,
        payload: data,
      });
      yield put({
        type: types.ADDRESS_LIST,
        payload: action.payload,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.DELETE_ADDRESS_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_ADDRESS_FAILURE,
      payload: error,
    });
  }
}

function* getPostalCodes(action) {
  try {
    const { data, errors } = yield call(Adresses.getPostalCodes);
    if (data) {
      yield put({
        type: types.GET_POSTALCODES_SUCCESS,
        payload: data,
      });
    } else if (errors && errors[0]?.errorType === "UnauthorizedException") {
      yield put({
        type: types.SESSION_EXPIRED,
        payload: errors,
      });
    } else {
      yield put({
        type: types.GET_POSTALCODES_FAILURE,
        payload: errors,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_POSTALCODES_FAILURE,
      payload: error,
    });
  }
}

export function* addressesSaga() {
  yield all([
    yield takeEvery(types.ADDRESS_LIST, getAddresses),
    yield takeEvery(types.CREATE_ADDRESS, postAddress),
    yield takeEvery(types.GET_POSTALCODES, getPostalCodes),
    yield takeEvery(types.DELETE_ADDRESS, deleteAddress),
  ]);
}
