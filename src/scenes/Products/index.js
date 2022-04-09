import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PlannerWrapper from "../lemmetry/PlannerWrapper";
import VibrantDirectMealPlanner from "../VibrantDirectMealPlanner";
// import ProductDetails from "./product-details";
import Products from "./products";
import './products.scss';

const ProductsRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Products} />
      <Route
        path={`${path}/:id`}
        component={VibrantDirectMealPlanner}
      />
    </Switch>
  );
};

export default ProductsRoutes;
