import { types } from '../constants';

export const getCustomerBalance=(data)=>{
    return{
        type: types.GET_BALANCE,
        payload: data,
    }
}