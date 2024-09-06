import React from "react";
import { Modal, Button } from "react-bootstrap";
import OkImage from "./../../assets/logos/icons8-ok-480.png";
import ErrorImage from "./../../assets/logos/icons8-error-64.png";

const ModalComponent = ({
  show,
  handleClose,
  Title,
  Body,
  type,
  footer = null,
  showModalHeader = true,
  primaryButtonClick,
  secondaryButtonClick,
  primaryButtonText,
  secondaryButtonText,
  fullscreen = true,
  showImage = true,
}) => {
  const getDefaultFooter = () => {
    return (
      <Modal.Footer className="order-modal-content-footer modal-footer-btn-group vl-edit-button-group">
        {primaryButtonText && (
          <Button className="vl-btn-primary" onClick={primaryButtonClick}>
            {primaryButtonText}
          </Button>
        )}
        {secondaryButtonText && (
          <Button className="vl-btn-secondary" onClick={secondaryButtonClick}>
            {secondaryButtonText}
          </Button>
        )}
      </Modal.Footer>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen} centered>
      {showModalHeader && <Modal.Header closeButton />}
      <Modal.Body className="order-modal-content">
        <div className="d-flex flex-column align-items-center justify-content-center">
          {showImage && (
            <img
              src={type === "success" ? OkImage : ErrorImage}
              width="150px"
              alt="Status_Image"
            />
          )}
          {Title && <div className="h4 m-2">{Title}</div>}
          <div className="my-4 modal-desp-info">{Body}</div>
        </div>
      </Modal.Body>
      {footer ? <Modal.Footer>{footer}</Modal.Footer> : getDefaultFooter()}
    </Modal>
  );
};

export default ModalComponent;
