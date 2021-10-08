/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPool from "../scenes/Login/UserPool";
import { getCognitoUser } from "../services/getCognitoUser";
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

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const AlertReducer = useSelector((state) => state.AlertReducer);

  useEffect(() => {
    console.log("AlertReducer", AlertReducer);
    const userpool = UserPool.getCurrentUser();
    console.log("USERPOOL-GETCURRENTUSER", userpool);

    if (userpool != null) {
      let cognitoUser = getCognitoUser({
        Pool: UserPool,
        Username: userpool.username,
      });

      cognitoUser.getSession((err, res) => {
        console.log("ERR-RESS", err, res);
      });

      cognitoUser.getUserAttributes((err, result) => {
        let temp = {};
        if (result) {
          result.map((item) => {
            console.log("MyData", item);
            switch (item.Name) {
              case "name":
                temp.name = item.Value;
                break;
              case "phone_number":
                temp.phone_number = item.Value;
                break;
              case "sub":
                temp.sub = item.Value;
                break;
              default:
                return temp;
            }
          });
          dispatch(updateUserDetails(temp));
          dispatch(getCart({ customer_id: temp.sub }));
        }
        console.log("SUCCESSSSSS", result);
        console.log("FAILEEEDDDD", err);
      });
    }
  }, []);

  useEffect(async () => {
    const getToken = await sessionStorage.getItem("token");
    if (getToken == null) {
      dispatch(getTokenFailure());
    } else {
      dispatch(getTokenSucces());
    }
  }, []);

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
