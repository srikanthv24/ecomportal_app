import React from "react";
import { Button } from "react-bootstrap";

const SubscriptionButtonGroup = ({ onCancel, onSubmit }) => (
  <section className="modal-footer-btn-group">
    <Button className="vl-btn-primary" type="submit" onClick={onSubmit}>
      PAUSE
    </Button>
    <Button className="vl-btn-secondary" onClick={onCancel}>
      CANCEL
    </Button>
  </section>
);

export default SubscriptionButtonGroup;
