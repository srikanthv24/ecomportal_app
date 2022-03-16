import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import auth_services from "../../services/auth_services";
import { clearUserDetails, getTokenFailure, loginSuccess, updateUserDetails } from "../../store/actions/auth";
import { handleModalClose, showLogin } from "../../store/actions";
import { getOrders } from "../../store/actions/orders";
import { getCart } from "../../store/actions/cart";
import { useHistory } from "react-router-dom";

export const SessionModal = ({ showModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.auth.userDetails);
  
  const handleRefresh = () => {

    // auth_services.refreshToken().then((res) => {
    //   dispatch(loginSuccess(res));
    //   sessionStorage.setItem("token", res.accessToken.jwtToken);
    // });
    dispatch(handleModalClose());

    auth_services.logout();
    sessionStorage.removeItem("token");
    dispatch(clearUserDetails());
    dispatch(getTokenFailure());
    // setMenu(false);
    history.push("/");
    dispatch(showLogin())
  };

  return (
    <Modal size="sm" show={showModal} centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h6 className="mb-0">Session Timed Out, Please Login Again !!!</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="p-1">
        <Button variant="danger" onClick={handleRefresh}>
          ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
