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
  primaryButtonText = "primary",
  secondaryButtonText = "secondary"
}) => {
  const DefaultFooter = () => {
    return <>
      <Button variant="secondary" onClick={primaryButtonClick}>{primaryButtonText}</Button>
      <Button variant="primary" onClick={secondaryButtonClick}>{secondaryButtonText}</Button>
    </>
    };
  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      {showModalHeader && <Modal.Header closeButton />}
      <Modal.Body>
        <div
          className={
            "d-flex flex-column align-items-center justify-content-center"
          }
        >
          <img
            src={type === "success" ? OkImage : ErrorImage}
            width="150px"
            alt="Status_Image"
          />
          <div className="h4 m-2">{Title}</div>
          <div className="fs-6">{Body}</div>
        </div>
      </Modal.Body>
      {footer ? <Modal.Footer>{footer}</Modal.Footer> : null}
    </Modal>
  );
};

export default ModalComponent;
