import { types } from '../constants';

const intialState = {
    loading: false,
    error: false,
    mealPlanId: '',
    mealPlansList: [],
    details: {}
}

export const mealPlansReducer = (state = intialState, action) => {
    console.log("meal plans reducerrrrrrrrr::::", action);
    switch (action.type) {
        case types.MEAL_PLAN_ID:
            return {
                ...state,
                mealPlanId: action.id,
            }
        case types.MEALPLANS_LIST:
            return {
                ...state,
                loading: true,
            }
        case types.MEALPLANS_LIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    mealPlansList: action.payload
                }    
        case types.MEALPLANS_LIST_FAILURE:
                return {
                    ...state,
                    mealPlansList: []
                }    
        case types.MEALPLAN_DETAILS:
            return {
                ...state,
                loading: true,
            }
        case types.MEALPLAN_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    details: action.payload
                }    
        case types.MEALPLAN_DETAILS_FAILURE:
                return {
                    ...state,
                    details: {}
                }    
                
        
        default:
            return state;
    }
}