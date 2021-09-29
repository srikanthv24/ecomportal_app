/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import AppBar from "../components/AppBar/app-bar";
import Login from "../scenes/Login";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";
import Cart from "../scenes/Cart";
import Subscription from "../scenes/Subscription";
import LemmeTry from "../scenes/lemmetry";
import Register from "../scenes/Register";
import { useSelector, useDispatch } from "react-redux";
import { getTokenSucces, getTokenFailure } from "../store/actions/auth";

function Routes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(async () => {
    const getToken = await sessionStorage.getItem("token");
    console.log("inside get token from sessionStorage:::", getToken);

    if (getToken == null) {
      dispatch(getTokenFailure());
    } else {
      dispatch(getTokenSucces());
    }
  }, []);

  console.log("is logged in status:::", isLoggedIn);

  return (
    <>
      {isLoggedIn && (
        <>
           <AppBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/products" component={ProductsRoutes} />
            <Route path="/categories" component={Categories} />
            <Route path="/cart" component={Cart} />
            <Route path="/subscription" component={LemmeTry} />
            <Route path="*">
              <Redirect to={"/"} />
            </Route>
          </Switch>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="*">
              <Redirect to={"/login"} />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default Routes;
