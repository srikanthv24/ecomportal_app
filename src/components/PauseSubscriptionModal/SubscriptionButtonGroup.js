import React from "react";
import { Button } from "react-bootstrap";

const SubscriptionButtonGroup = ({ onCancel, onSubmit }) => (
  <>
    <Button variant="primary" type="submit" onClick={onSubmit}>
      PAUSE
    </Button>
    <Button variant="secondary" onClick={onCancel}>
      CANCEL
    </Button>
  </>
);

export default SubscriptionButtonGroup;
