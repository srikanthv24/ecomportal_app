import { types } from "../constants";

const initialState = {
  loading: false,
  error: false,
  addressList: [],
  postalCodes: [],
  deleteAddress: {},
  deliveryCharge: {}
};

export const Addresses = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDRESS_LIST_SUCCESS:
      return { ...state, addressList: action.payload };

    case types.ADDRESS_LIST_FAILURE:
      return { ...state, addressList: [] };

      //add new address
      case types.CREATE_ADDRESS: 
      return { ...state, loading: true };

    case types.CREATE_ADDRESS_SUCCESS:
      return { 
          ...state, 
          loading : false,
          addressStatus: action.payload
        }

    case types.CREATE_ADDRESS_FAILURE:
      return { 
          ...state, 
          loading : false,
          addressStatus: action.payload,
        }
    
     //delete address
     case types.DELETE_ADDRESS: 
     return { ...state, loading: true };

    case types.DELETE_ADDRESS_SUCCESS:
      return { 
          ...state, 
          loading : false,
          deleteAddress: action.payload
        }

    case types.DELETE_ADDRESS_FAILURE:
      return { 
          ...state, 
          loading : false,
          error: true,
          deleteAddress: action.payload
        }


     //postal codes
     case types.GET_POSTALCODES: 
     return {
       ...state, 
       loading: true
     }

    case types.GET_POSTALCODES_SUCCESS: 
      return {
        ...state, 
        loading: false,
        postalCodes: action.payload
      }
 
     case types.GET_POSTALCODES_FAILURE: 
     return {
       ...state, 
       loading: false,
       postalCodes: [],
       error: true
     }

    //Delivery charge
    case types.DELIVERY_CHARGE: 
      return {
        ...state, 
        loading: true
      }

    case types.DELIVERY_CHARGE_SUCCESS: 
      return {
        ...state, 
        loading: false,
        deliveryCharge: action.payload
      }
 
    case types.DELIVERY_CHARGE_FAILURE: 
      return {
        ...state, 
        loading: false,
        deliveryCharge: {},
        error: true
      }

    default:
      return state;
  }
};
