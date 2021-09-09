import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductDetails from "./product-details";
import Products from "./products";

const ProductsRoutes = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={Products} />
      <Route path={`${path}/:id`} component={ProductDetails} />
    </Switch>
  );
};

export default ProductsRoutes;
