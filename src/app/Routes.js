import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import Products from "../scenes/Products";
import ProductDetails from "../scenes/Products/product-details";

import Login from "../scenes/Login";
import Categories from "../scenes/Categories";
import ProductsRoutes from "../scenes/Products";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/products" component={ProductsRoutes} />
      <Route path="/categories" component={Categories} />
      <Route path="/login" component={Login} />
      {/* <Route exact path="/">
          <Redirect to={"login"} />
        </Route>
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/createcategory" component={AddCategory} /> */}
    </Switch>
  );
}

export default Routes;
