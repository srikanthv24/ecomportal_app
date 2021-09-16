import { combineReducers } from 'redux';
import {
    login,
    categories,
    Addresses,
    Cart,
    customerReducer,
    mealPlansReducer
} from './reducers';
import { products } from './reducers/products';

const rootReducer = combineReducers({
    login: login,
    categories: categories,
    products: products,
    Addresses: Addresses,
    Cart: Cart,
    customer: customerReducer,
    mealPlans: mealPlansReducer,
})

export default rootReducer;