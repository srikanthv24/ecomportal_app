/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTokenFailure,
  getTokenSucces,
  updateUserDetails,
} from "../store/actions/auth";
import { Button } from "react-bootstrap";
import { getCart } from "../store/actions/cart";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalComponent from "../components/Modal/modal";
import { hideAlert } from "../store/actions/alert";
import { useHistory } from "react-router";
import auth_services from "../services/auth_services";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const AlertReducer = useSelector((state) => state.AlertReducer);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(async () => {
    const getToken = await sessionStorage.getItem("token");
    if (getToken == null) {
      dispatch(getTokenFailure());
    } else {
      dispatch(getTokenSucces());
    }

    auth_services
      .getUser()
      .then((res) => {
        console.log("RESSSS", res);
        dispatch(updateUserDetails(res));
      })
      .catch((err) => {
        console.log("FAILEEEDDDD", err);
      });
  }, []);

  useEffect(() => {
    dispatch(getCart({ customer_id: userDetails.sub }));
  }, [userDetails.sub]);

  return (
    <div className="App">
      <ModalComponent
        show={AlertReducer.showAlert}
        type={AlertReducer.variant}
        Body={AlertReducer.alertMessage.body}
        Title={AlertReducer.alertMessage.title}
        handleClose={() => dispatch(hideAlert())}
        footer={
          <div>
            <Button
              onClick={() => {
                dispatch(hideAlert());
                dispatch(getCart({ customer_id: userDetails.sub }));
                history.push("/orders");
              }}
            >
              Go to Orders
            </Button>
          </div>
        }
      />
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
