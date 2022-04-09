import { combineReducers } from "redux";
import {
  categories,
  Addresses,
  Cart,
  customerReducer,
  mealPlansReducer,
  AuthReducer,
  balanceReducer,
  sessionExpireReducer,
  schedule,
  subscriptionReducer,
  Subscriptions
} from "./reducers";
import { AlertReducer } from "./reducers/alert";
import { Login } from "./reducers/login";
import { Orders } from "./reducers/orders";
import { products } from "./reducers/products";

const rootReducer = combineReducers({
  categories: categories,
  products: products,
  Addresses: Addresses,
  Cart: Cart,
  customer: customerReducer,
  mealPlans: mealPlansReducer,
  auth: AuthReducer,
  AlertReducer: AlertReducer,
  Orders: Orders,
  Login: Login,
  balanceReducer: balanceReducer,
  sessionExpire: sessionExpireReducer,
  schedule: schedule,
  subscription: subscriptionReducer,
  subscriptions: Subscriptions
});

export default rootReducer;
