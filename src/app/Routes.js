import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import Products from "../scenes/Products";
import ProductDetails from "../scenes/Products/product-details";
//import AppBar from "../components/AppBar/app-bar";

import Login from "../scenes/Login";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";
import Cart from "../scenes/Cart";
import Subscription from "../scenes/Subscription";
import LemmeTry from "../scenes/lemmetry";
import Register from "../scenes/Register";
import { useSelector } from 'react-redux';

function Routes() {
  //const token = useSelector(state => state.auth.token);
  var token = localStorage.getItem("token");
  // useEffect(() => {
    
  //   if(token == null) {
  //     history.push("/login");
  //   }
  // },[])

  console.log("token from local storage:::::", token);

  return (
    <Switch>
      {token && 
      <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/products" component={ProductsRoutes} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/subscription" component={LemmeTry} />
      </>
      }
      <>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    {/*      
      <Route path="*">
          <Redirect to={"/login"} />
      </Route> */}
      </> 
     {/*
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/createcategory" component={AddCategory} /> */}
    </Switch>
  );
}

export default Routes;
