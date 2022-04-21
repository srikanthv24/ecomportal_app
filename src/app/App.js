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
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth_services from "../services/auth_services";
import { GrClose } from "react-icons/gr";
import LoginModal from "../components/LoginModal";
import { getCartItemsCount, hideLogin } from "../store/actions";
import "./App.scss";
import { SessionModal } from "../components/SessionExpireModal";
import { RefreshToken } from "../helpers/refreshSession";

function App() {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.auth.userDetails);
  const loginModal = useSelector((state) => state.Login.isLoggedIn);
  const { showModal, errors } = useSelector((state) => state.sessionExpire);

  useEffect(async () => {
    const getToken = await RefreshToken.getRefreshedToken();
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

      console.log("process", process.env);
  }, []);

  useEffect(() => {
    if (userDetails.sub) {
      dispatch(getCartItemsCount({ customer_id: userDetails.sub }));
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
          style={{ position: "absolute", top: 0, right: 0, background:'#f5f5f5', border:'none' }}
          onClick={() => dispatch(hideLogin())}
        >
          <GrClose />
        </Button>

        <Container style={{ background: "#FFFFFF", minHeight: 400, width: "100%", padding:'0px' }}>
          <LoginModal />
        </Container>
      </Modal>
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
