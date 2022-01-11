import {call,put,all,takeLatest}  from "@redux-saga/core/effects";
import { BalanceApi } from "../../services/api";
import { types } from "../constants"

function* Balance(action){
    try{
        const response = yield call(BalanceApi.getCustomerBalance, action.payload);
        console.log("inside Balance saga Data ::",response)
        if(response.data){
             yield put({
                 type : types.GET_BALANCE_SUCCESS,
                 payload : response.data
             });
        }
        else {
            yield put({
                type : types.GET_BALANCE_FAILURE,
                payload : response.data
            })
        }
    }catch(error){
       yield put({
            type : types.GET_BALANCE_FAILURE,
            payload : error
       })
    }
}

export function* balanceSaga(){
    yield all(
        [
            takeLatest(types.GET_BALANCE ,Balance)
        ]
    )
}
