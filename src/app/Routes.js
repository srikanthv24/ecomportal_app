import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Landing } from "../scenes/Consumer";
import Products from "../scenes/Products";
import ProductDetails from "../scenes/Products/product-details";

import Login from '../scenes/Login';
import Categories from '../scenes/Categories';
import AddCategory from '../scenes/AddCategory';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/">
          <Redirect to={"login"} />
        </Route>
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/createcategory" component={AddCategory} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;
