import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.auth.userDetails);
  return (
    <Route
      {...rest}
      render={async (props) => {
        if (userDetails.sub !== '') {
          return (
            // props.history.push('/login')
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
export default PublicRoute;
