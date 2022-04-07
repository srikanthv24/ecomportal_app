/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Landing } from "../scenes/Consumer";
import AppBar from "../components/AppBar/app-bar";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";
import Cart from "../scenes/Cart";
import LemmeTry from "../scenes/lemmetry";
import CartSummary from "../scenes/Cart/cart-summary";
import Orders from "../scenes/Orders";
import {Profile} from '../scenes/Profile';
import LegalContent from "../components/LegalContent";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";
import VibrantMealPlanner from "../scenes/VibrantMealPlanner";
import Disclaimer from "../components/Disclaimer/Disclaimer";
import AddressComponent from "../scenes/VibrantMealPlanner/AddressComponent";

function Routes() {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [AppLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2000);
  }, []);

  return (
    <section style={{ height:'100vh',background:'#f1935d'}}>
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
          <Spinner animation="grow" style={{background: "#614731"}} />
          Loading...
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/products" component={ProductsRoutes} />
          <Route path="/categories" component={Categories} />
          <Route path="/subscription" component={LemmeTry} />
          <Route path="/profile" component={Profile} />
          <Route path="/vibrant-meal-planner" component={VibrantMealPlanner}/>
          <Route path="/legalcontent" component={LegalContent}/>
          <Route path="/privacypolicy" component={PrivacyPolicyContent}/>
          <Route path="/disclaimer" component={Disclaimer}/>
          <Route path="/add-address" component={AddressComponent} />
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
    </section>
  );
}

export default Routes;
