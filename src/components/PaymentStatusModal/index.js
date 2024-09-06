import React from "react";
import { Modal, Button } from "react-bootstrap";
import SucessIcon from "../../assets/mealplanner/alert-success.svg";
import FailureIcon from "../../assets/mealplanner/alert-failed.svg";
import {
  CART,
  COMPLTED_SUCCESSFULLY,
  FAILED,
  FAILURE_TITLE,
  GO_TO_CART,
  RETRY,
  RETRY_MESSAGE,
  SUCCESS,
  SUCCESS_TITLE,
  WITH_TRANSACTION_ID,
  YOUR_PAYMENT,
} from "../../utils/constants";
import "./styles.scss";

export const PaymentStatusModal = ({
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
      <Modal.Body className="order-modal-content pt-5">
        
        <div className="payment-status-modal">
        <div className="d-flex justify-content-center align-items-center success-icon-align">
          <img
            src={type === SUCCESS ? SucessIcon : FailureIcon}
            width="50"
            alt="Status_Image" className="success-img-bg"
          />
        </div>
          <p className="h3 m-2 psm-title">{`${
            type === SUCCESS ? SUCCESS_TITLE : FAILURE_TITLE
          }`}</p>
          <p className="m-2 psm-text">{`${YOUR_PAYMENT} ${
            type === SUCCESS ? COMPLTED_SUCCESSFULLY : FAILED
          }`}</p>
          <p className="m-2 psm-text">{`${
            type === SUCCESS
              ? `${WITH_TRANSACTION_ID} ${transactionId}`
              : RETRY_MESSAGE
          }`}</p>
        </div>
      </Modal.Body>
      {type === SUCCESS ? <SuccessModalFooter /> : <FailedModalFooter />}
    </Modal>
  );
};

