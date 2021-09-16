import { all } from "redux-saga/effects";
import { 
    CartSaga, 
    categoriesSaga, 
    productsSaga, 
    customerSaga,
    mealPlansSaga,
  } from "./saga";
import { CartItemSaga } from "./saga/cartItem";

export default function* rootSaga() {
  yield all([
      categoriesSaga(), 
      productsSaga(), 
      CartSaga(), 
      CartItemSaga(),
      customerSaga(),
      mealPlansSaga(),
      
    ]);
}
