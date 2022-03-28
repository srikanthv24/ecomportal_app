import React from "react";
import { Modal } from "react-bootstrap";
import OkImage from "./../../assets/logos/icons8-ok-480.png";
import ErrorImage from "./../../assets/logos/icons8-error-64.png";
import { Button } from "react-bootstrap";

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
      <Modal.Footer>
        {secondaryButtonText && (
          <Button variant="secondary" onClick={secondaryButtonClick}>
            {secondaryButtonText}
          </Button>
        )}
        {primaryButtonText && (
          <Button variant="primary" onClick={primaryButtonClick}>
            {primaryButtonText}
          </Button>
        )}
      </Modal.Footer>
    );
  };
  return (
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen}>
      {showModalHeader && <Modal.Header closeButton />}
      <Modal.Body>
        <div
          className={
            "d-flex flex-column align-items-center justify-content-center"
          }
        >
          {showImage && (
            <img
              src={type === "success" ? OkImage : ErrorImage}
              width="150px"
              alt="Status_Image"
            />
          )}
          {Title && <div className="h4 m-2">{Title}</div>}
          <div className="fs-6">{Body}</div>
        </div>
      </Modal.Body>
      {footer ? <Modal.Footer>{footer}</Modal.Footer> : getDefaultFooter()}
    </Modal>
  );
};

export default ModalComponent;
