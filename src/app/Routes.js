/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import AppBar from "../components/AppBar/app-bar";
import Login from "../scenes/Login";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";
import Cart from "../scenes/Cart";
import LemmeTry from "../scenes/lemmetry";
import Register from "../scenes/Register";
import { useSelector, useDispatch } from "react-redux";
import { getTokenSucces, getTokenFailure } from "../store/actions/auth";
import CartSummary from "../scenes/Cart/cart-summary";
import Orders from "../scenes/Orders";
import { Spinner } from "react-bootstrap";

function Routes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log("is logged in status:::", isLoggedIn);
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
            flexDirection: 'column',
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
          <Route path="/subscription" component={LemmeTry} />

          {userDetails.sub && (
            <>
              <Route path="/cart-summary" component={CartSummary} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={Orders} />{" "}
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
