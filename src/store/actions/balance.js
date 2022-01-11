import { types } from '../constants';

export const getCustomerBalance=(data)=>{
    console.log("In Actions")
    return{
        type: types.GET_BALANCE,
        payload: data,
    }
}