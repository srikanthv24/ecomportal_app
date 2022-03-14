import { types } from '../constants';

const intialState = {
    loading: false,
    error: false,
    genderList: [],
    activityList: [],
    dietList: [],
    goalList: [],
    custData: {},
    // customerId: "578461ea-bc50-4d40-8c0a-5c4546abc2d7",
}

export const customerReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.GET_CUST_GENDER:
            return {
                ...state,
                loading: true,
                genderList: [],
                error: false
            }
        case types.GET_CUST_GENDER_SUCCESS:
            return {
                ...state,
                loading: false,
                genderList: action.payload,
                error: false
            }
            case types.GET_CUST_GENDER_FAILURE:
            return {
                ...state,
                loading: false,
                genderList: [],
                error: true
            }
            case types.GET_CUST_ACTIVITY:
                return {
                    ...state,
                    loading: true,
                    activityList: [],
                    error: false
                }
                case types.GET_CUST_ACTIVITY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    activityList: action.payload,
                    error: false
                }
                case types.GET_CUST_ACTIVITY_FAILURE:
                return {
                    ...state,
                    loading: false,
                    activityList: [],
                    error: true
                }
                case types.GET_CUST_DIET:
                    return {
                        ...state,
                        loading: true,
                        dietList: [],
                        error: false
                    }
                    case types.GET_CUST_DIET_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        dietList: action.payload,
                        error: false
                    }
                    case types.GET_CUST_DIET_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        dietList: [],
                        error: true
                    }
                    case types.GET_CUST_GOAL:
                        return {
                            ...state,
                            loading: true,
                            goalList: [],
                            error: false
                        }
                        case types.GET_CUST_GOAL_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            goalList: action.payload,
                            error: false
                        }
                        case types.GET_CUST_GOAL_FAILURE:
                        return {
                            ...state,
                            loading: false,
                            goalList: [],
                            error: true
                        }

                        case types.SAVE_USER_DATA:
                            return {
                                ...state,
                                custData: action.payload
                            }

                        case types.POST_CUST_DATA:
                            return {
                                ...state,
                                loading: true,
                                custData: {},
                                error: false
                            }
                            case types.POST_CUST_DATA_SUCCESS:
                            return {
                                ...state,
                                loading: false,
                                customerId: action.payload,
                                error: false
                            }
                            case types.POST_CUST_DATA_FAILURE:
                            return {
                                ...state,
                                loading: false,
                                custData: {},
                                error: true
                            }
        default:
            return state;
    }
}