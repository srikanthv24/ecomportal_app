/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTokenFailure,
  getTokenSucces,
  updateUserDetails,
} from "../store/actions/auth";
import { Button, Container, Modal } from "react-bootstrap";
import { getCart } from "../store/actions/cart";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth_services from "../services/auth_services";
import { getOrders } from "../store/actions/orders";
import { GrClose } from "react-icons/gr";
import LoginModal from "../components/LoginModal";
import { hideLogin } from "../store/actions";
import "./App.css";
import { SessionModal } from "../components/SessionExpireModal";

function App() {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.auth.userDetails);
  const loginModal = useSelector((state) => state.Login.isLoggedIn);
  const { showModal, errors } = useSelector((state) => state.sessionExpire);

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
        dispatch(updateUserDetails(res));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (userDetails.sub) {
      dispatch(getCart({ customer_id: userDetails.sub }));
      dispatch(
        getOrders({ customer_number: userDetails.phone_number.substring(3) })
      );
    }
  }, [userDetails.sub]);

  return (
    <div className="App">
      <SessionModal
        showModal={showModal}
        // message={errors[0]?.message}
      />
      <Modal show={loginModal} centered size="xl">
        <Button
          variant="light"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => dispatch(hideLogin())}
        >
          <GrClose />
        </Button>

        <Container style={{ background: "#FFF", height: 600, width: "100%" }}>
          <LoginModal />
        </Container>
      </Modal>
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
