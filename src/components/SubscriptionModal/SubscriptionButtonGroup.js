import React from "react";
import { Button } from "react-bootstrap";

const SubscriptionButtonGroup = React.memo(
  ({
    onCancel,
    onSubmit,
    primaryButtonText,
    isPrimaryButtonDisabled,
    hideCancelButton,
  }) => (
    <section className="modal-footer-btn-group">
      <Button
        className="vl-btn-primary"
        type="submit"
        onClick={onSubmit}
        disabled={isPrimaryButtonDisabled}
      >
        {primaryButtonText}
      </Button>
      {!hideCancelButton && (
        <Button className="vl-btn-secondary" onClick={onCancel}>
          CANCEL
        </Button>
      )}
    </section>
  )
);

export default SubscriptionButtonGroup;
