import { types } from "../constants";

const initialState = {
  cartDetails: {
    items: [],
  },
  cartUpdateLoading: false,
  cartLoading: false,
  cartItemsLoading: false,
  cartCreated: {},
  cartCount: { isLoading: false, itemsCount: 0 },
};

export const Cart = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CART_INPUT:
      return { ...state, cartLoading: true };

    case types.UPDATE_CART_ITEM:
      return { ...state, cartItemsLoading: true };

    case types.UPDATE_CART_ITEM_SUCCESS:
      return { ...state, cartItemsLoading: false };
    case types.UPDATE_CART_ITEM_FAILURE:
      return { ...state, cartItemsLoading: false };

    case types.GET_CART:
      return {
        ...state,
        cartLoading: true,
      };

    case types.GET_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartDetails: action.payload,
      };
    case types.GET_CART_FAILURE:
      return { ...state, cartLoading: false, cartDetails: {} };

    case types.CREATE_CART:
      return {
        ...state,
        cartLoading: true,
      };

    case types.CREATE_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartCreated: { ...action.payload.createCart },
      };
    case types.CREATE_CART_FAILURE:
      return { ...state, cartLoading: false, cartCreated: {} };

    case types.UPDATE_CART:
      return { ...state, cartUpdateLoading: true };

    case types.UPDATE_CART_SUCCESS:
      return { ...state, cartUpdateLoading: false };
    case types.UPDATE_CART_FAILURE:
      return { ...state, cartUpdateLoading: false };

    case types.UPDATE_CART_QTY:
      return { ...state, cartUpdateLoading: true };
    case types.UPDATE_CART_QTY_SUCCESS:
      return { ...state, cartUpdateLoading: false };
    case types.UPDATE_CART_QTY_FAILURE:
      return { ...state, cartUpdateLoading: false };

    case types.GET_CART_COUNT:
      return { ...state, cartCount: { isLoading: true } };

    case types.GET_CART_COUNT_SUCCESS:
      return {
        ...state,
        cartCount: { isLoading: false, itemsCount: action.payload },
      };

    case types.GET_CART_COUNT_FAILURE:
      return { ...state, cartCount: { isLoading: false, itemsCount: 0 } };

    case types.DELETE_CART_ITEM:
      return { ...state, cartUpdateLoading: true };

    case types.DELETE_CART_ITEM_SUCCESS:
      return { ...state, cartUpdateLoading: false };

    case types.DELETE_CART_ITEM_FAILURE:
      return { ...state, cartUpdateLoading: false };
    default:
      return state;
  }
};
