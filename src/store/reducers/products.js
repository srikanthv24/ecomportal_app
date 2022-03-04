import { types } from "../constants";

const initialState = {
	productList: { items: [] },
	productDetails: {},
	searchResults: [],
	loading: false,
	error: false,
	addons: []
};

export const products = (state = initialState, action) => {
	switch (action.type) {
		case types.PRODUCT_LIST:
			return { ...state, productList: action.payload, loading: true };
		case types.PRODUCT_LIST_SUCCESS:
			return { ...state, productList: action.payload, loading: false };

		case types.PRODUCT_LIST_FAILURE:
			return { ...state, productList: [], loading: false };

		case types.PRODUCT_DETAILS_SUCCESS:
			return { ...state, productDetails: action.payload };

		case types.PRODUCT_DETAILS_FAILURE:
			return { ...state, productDetails: {} };
		case types.PRODUCT_SEARCH_SUCCESS:
			return { ...state, searchResults: action.payload };

		case types.PRODUCT_SEARCH_FAILURE:
			return { ...state, searchResults: [] };
		case types.GET_ADDONS:
			return {
				...state,
				loading: true,
				addons: [],
				error: false
			}
		case types.GET_ADDONS_SUCCESS:
			return {
				...state,
				loading: false,
				addons: action.payload,
				error: false
			}
		case types.GET_ADDONS_FAILURE:
			return {
				...state,
				loading: false,
				addons: [],
				error: true
			}

			case "CLEAR_PRODUCT":
				return  { ...state, productDetails: {} };
		default:
			return state;
	}
};
