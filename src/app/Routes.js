/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import AppBar from "../components/AppBar/app-bar";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";
import Cart from "../scenes/Cart";
import LemmeTry from "../scenes/lemmetry";
import { useSelector } from "react-redux";
import CartSummary from "../scenes/Cart/cart-summary";
import Orders from "../scenes/Orders";
import { Spinner } from "react-bootstrap";
import {Profile} from '../scenes/Profile';
import { MealBooking } from "../scenes/MealBooking";

function Routes() {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [AppLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <AppBar />
      {AppLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 500,
          }}
        >
          <Spinner animation="grow" variant="primary" />
          Loading...
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/products" component={ProductsRoutes} />
          <Route path="/categories" component={Categories} />
          {/* <Route path="/subscription" component={LemmeTry} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/mealbooking" component={MealBooking}/>
          <Route path="/subscription" component={MealBooking}/>
          {userDetails.sub && (
            <>
              <Route path="/cart-summary" component={CartSummary} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={Orders} />{" "}
              <Route path="/profile" component={Profile} />
            </>
          )}
          <Route path="*">
            <Redirect to={"/"} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default Routes;
