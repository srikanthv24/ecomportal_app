import { types } from "../constants";

const initialState = {
  cartDetails: {
    items: [],
  },
  //   cartItemList: [],
  cartUpdateLoading: false,
  cartLoading: false,
  cartItemsLoading: false,
  cartSummary: {
    isLoading: false,
    data: { items: [] },
  },
};

export const Cart = (state = initialState, action) => {
  switch (action.type) {
    // case types.GET_CART_ITEM:
    //   return { ...state, cartLoading: true };
    // case types.GET_CART_ITEM_SUCCESS:
    //   return {
    //     ...state,
    //     cartItemList: action.payload.listCartItems.items,
    //     cartItemsLoading: false,
    //     cartLoading: false,
    //   };

    // case types.GET_CART_ITEM_FAILURE:
    //   return { ...state, cartItemList: [], cartItemsLoading: false };

    // case types.UPDATE_CART_ITEM_SUCCESS:
    //   return { ...state, cartItemList: action.payload };

    // case types.ADD_CART_ITEM_SUCCESS:
    //   return {
    //     ...state,
    //     cartItemsLoading: false,
    //   };

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
        cartDetails: { ...action.payload.createCart },
      };
    case types.CREATE_CART_FAILURE:
      return { ...state, cartLoading: false, cartDetails: {} };

    // case types.UPDATE_CART_SUCCESS:
    //   return {
    //     ...state,
    //     cartDetails: { ...action.payload.updateCart },
    //   };
    // case types.UPDATE_CART_FAILURE:
    //   return { ...state, cartLoading: false, cartDetails: {} };

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

    case types.GET_CART_SUMMARY:
      return { ...state, cartSummary: { isLoading: true } };

    case types.GET_CART_SUMMARY_SUCCESS:
      return {
        ...state,
        cartSummary: { isLoading: false, data: action.payload },
      };

    case types.GET_CART_SUMMARY_FAILURE:
      return { ...state, cartSummary: { isLoading: false, data: {} } };

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
