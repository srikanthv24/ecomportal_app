import { combineReducers } from 'redux';
import {
    login,
    categories,
    Addresses
} from './reducers';
import { products } from './reducers/products';

const rootReducer = combineReducers({
    login: login,
    categories: categories,
    products: products,
    Addresses: Addresses
})

export default rootReducer;