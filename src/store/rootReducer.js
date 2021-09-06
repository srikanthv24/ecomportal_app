import { combineReducers } from 'redux';
import {
    login,
    categories
} from './reducers';
import { products } from './reducers/products';

const rootReducer = combineReducers({
    login: login,
    categories: categories,
    products: products
})

export default rootReducer;