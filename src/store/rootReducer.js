import { combineReducers } from 'redux';
import {
    categories,
    Addresses,
    Cart,
    customerReducer,
    mealPlansReducer,
    AuthReducer
} from './reducers';
import { products } from './reducers/products';

const rootReducer = combineReducers({
    categories: categories,
    products: products,
    Addresses: Addresses,
    Cart: Cart,
    customer: customerReducer,
    mealPlans: mealPlansReducer,
    auth: AuthReducer,
})

export default rootReducer;