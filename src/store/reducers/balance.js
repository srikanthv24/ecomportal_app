import {types} from '../constants'

const initialState ={
    loading: false,
    error: false,
    balance :{}
}


export const balanceReducer=(state = initialState,action)=>{
    switch(action.type){
        case types.GET_BALANCE:
            return {
                ...state,
                loading: true,
            }
        case types.GET_BALANCE_SUCCESS:
            return {
              ...state,
              loading: false,
              balance: action.payload
        }
        
        case types.GET_BALANCE_FAILURE:
            return {
              ...state,
              loading: false,
              error: true,
              balance: action.payload
        }
    
    default : 
    return state;
    }
}