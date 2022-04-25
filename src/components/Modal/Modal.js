import React from "react";
import { Modal, Button } from "react-bootstrap";
import OkImage from "./../../assets/logos/icons8-ok-480.png";
import ErrorImage from "./../../assets/logos/icons8-error-64.png";
import {
  CART,
  COMPLTED_SUCCESSFULLY,
  FAILED,
  FAILURE_TITLE,
  GO_TO_CART,
  RETRY,
  RETRY_MESSAGE,
  SUCCESS_TITLE,
  WITH_TRANSACTION_ID,
  YOUR_PAYMENT,
} from "../../utils/constants";
import './styles.scss';

const ModalComponent = ({
  show,
  handleClose,
  type,
  showModalHeader,
  fullscreen = true,
  onGoToCartClick,
  onRetryClick,
  onGoToOrdersClick,
  transactionId = "",
}) => {
  const FailedModalFooter = () => {
    return (
      <Modal.Footer className="order-modal-content-footer modal-footer-btn-group vl-edit-button-group">
        <Button className="vl-btn-primary" onClick={onGoToCartClick}>
          {GO_TO_CART}
        </Button>
        <Button className="vl-btn-secondary" onClick={onRetryClick}>
          {RETRY}
        </Button>
      </Modal.Footer>
    );
  };

  const SuccessModalFooter = () => {
    return (
      <Modal.Footer className="order-modal-content-footer modal-footer-btn-group vl-edit-button-group">
        <Button className="vl-btn-primary w-100" onClick={onGoToOrdersClick}>
          {CART.GO_TO_ORDERS}
        </Button>
      </Modal.Footer>
    );
  };
  return (
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen} centered>
      {showModalHeader && <Modal.Header closeButton />}
      <Modal.Body className="order-modal-content">
        <div className="d-flex justify-content-center align-items-center my-2">
          <img
            src={type === "success" ? OkImage : ErrorImage}
            width="50px"
            alt="Status_Image"
          />
        </div>
        <div className="payment-status-modal">
          <p className="h3 m-2">{`${
            type === "success" ? SUCCESS_TITLE : FAILURE_TITLE
          }`}</p>
          <p className="m-2">{`${YOUR_PAYMENT} ${
            type === "success" ? COMPLTED_SUCCESSFULLY : FAILED
          }`}</p>
          <p className="m-2">{`${
            type === "success"
              ? `${WITH_TRANSACTION_ID} ${transactionId}`
              : RETRY_MESSAGE
          }`}</p>
        </div>
      </Modal.Body>
      {type === "success" ? <SuccessModalFooter /> : <FailedModalFooter />}
    </Modal>
  );
};

export default ModalComponent;
