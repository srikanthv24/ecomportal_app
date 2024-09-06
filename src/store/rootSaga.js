import { all } from "redux-saga/effects";
import { 
    CartSaga, 
    categoriesSaga, 
    productsSaga, 
    customerSaga,
    mealPlansSaga,
    addressesSaga,
    balanceSaga,
    subscriptionsSaga
  } from "./saga";
import { CartItemSaga } from "./saga/cartItem";
import { OrdersSaga } from "./saga/orders";

export default function* rootSaga() {
  yield all([
      categoriesSaga(), 
      productsSaga(), 
      CartSaga(), 
      CartItemSaga(),
      customerSaga(),
      mealPlansSaga(),
      addressesSaga(),
      OrdersSaga(),
      balanceSaga(),
      subscriptionsSaga()
    ]);
}
