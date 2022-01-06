import { types } from "../constants";

const intialState = {
  loading: false,
  categories: [],
  categoryCreated: false,
  error: false,
};

export const categories = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        loading: true,
        categories: [],
        error: false,
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: false,
      };
    case types.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        categories: [],
        error: true,
      };
    case types.CREATE_CATEGORY:
      return {
        ...state,
        loading: true,
        categoryCreated: false,
        error: false,
      };
    case types.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        categoryCreated: true,
        error: false,
      };
    case types.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        categoryCreated: false,
        error: true,
      };
    case types.CLEAR_CATEGORY_STATE:
      return {
        ...state,
        loading: false,
        categoryCreated: false,
        error: false,
      };
    default:
      return state;
  }
};
