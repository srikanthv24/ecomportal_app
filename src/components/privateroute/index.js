import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={async (props) => {
      if (!isAuthenticated) {
        return (
          // props.history.push('/login')
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default PrivateRoute;
