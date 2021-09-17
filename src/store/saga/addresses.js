import { all, call, put, takeEvery } from "redux-saga/effects";
import { Adresses } from "../../services/api/adresses";
import { types } from "../constants";

function* getAddresses(action) {
  console.log("reduc action:::", action);
    try {
      const response = yield call(Adresses.getAddressList, action.payload);
      if (response.data) {
        yield put({
          type: types.ADDRESS_LIST_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: types.ADDRESS_LIST_FAILURE,
        payload: [],
      });
    }
  }


function* postAddress(action) {
  console.log("post address saga::::", action);
  try {
    const response = yield call(Adresses.postAddress, action.payload);
    console.log("post address saga after response::::", response);
    if (response.data) {
      yield put({
        type: types.CREATE_ADDRESS_SUCCESS,
        payload: response.data,
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
    const response = yield call(Adresses.deleteAddress, action.payload);
    if (response.data) {
      yield put({
        type: types.CREATE_ADDRESS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: types.CREATE_ADDRESS_FAILURE,
      payload: {},
    });
  }
}

function* getPostalCodes(action) {
  try {
    const response = yield call(Adresses.getPostalCodes);
    if (response) {
      yield put({
        type: types.GET_POSTALCODES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_POSTALCODES_FAILURE,
      payload: {},
    });
  }
}

  



export function* addressesSaga() {
  yield all([
      yield takeEvery(types.ADDRESS_LIST, getAddresses),
      yield takeEvery(types.CREATE_ADDRESS, postAddress),
      yield takeEvery(types.GET_POSTALCODES, getPostalCodes),
  ])
}

