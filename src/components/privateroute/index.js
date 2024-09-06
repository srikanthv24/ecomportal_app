import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Route
      {...rest}
      render={async (props) => {
        if (!isLoggedIn) {
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
};
export default PrivateRoute;
